package moaon.backend.article.repository.es;

import co.elastic.clients.elasticsearch.core.BulkResponse;
import co.elastic.clients.elasticsearch.core.bulk.BulkResponseItem;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventStatus;
import moaon.backend.event.repository.EsEventOutboxRepository;
import moaon.backend.global.exception.custom.CustomException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class EsEventPoller {

    private final EsEventOutboxRepository outboxRepository;
    private final PolledDocumentIndexer polledDocumentIndexer;
    private final ObjectMapper objectMapper;

    private static final int BATCH_SIZE = 100;
    private static final int MAX_RETRIES = 5;

    @Scheduled(fixedDelay = 2000)
    @Transactional
    public void pollAndProcessEvents() {
        try {
            List<EsEventOutbox> events = outboxRepository.findEventsByStatus(EventStatus.PENDING, BATCH_SIZE);
            if (events.isEmpty()) return;

            ProcessingResult result = processEvents(events);
            updateEventsState(result);

        } catch (Exception e) {
            log.error("Outbox Poller 실행 중 예외 발생: {}", e.getMessage(), e);
        }
    }

    private ProcessingResult processEvents(List<EsEventOutbox> events) throws IOException {
        ProcessingResult result = new ProcessingResult();

        List<EsEventOutbox> validEvents = validateEvents(events, result);
        if (validEvents.isEmpty()) return result;

        BulkResponse response = polledDocumentIndexer.processEvents(validEvents);
        handleBulkResponse(response, validEvents, result);

        return result;
    }

    private List<EsEventOutbox> validateEvents(List<EsEventOutbox> events, ProcessingResult result) {
        List<EsEventOutbox> validEvents = new ArrayList<>();

        for (EsEventOutbox event : events) {
            try {
                event.getPayload(objectMapper);
                validEvents.add(event);
            } catch (CustomException | IllegalArgumentException e) {
                log.warn("유효하지 않은 이벤트 격리 (EventID: {})", event.getId());
                result.addFail(event);
            }
        }

        return validEvents;
    }

    private void handleBulkResponse(BulkResponse response, List<EsEventOutbox> events, ProcessingResult result) {
        if (response == null || response.items() == null) return;

        List<BulkResponseItem> items = response.items();
        for (int i = 0; i < items.size(); i++) {
            BulkResponseItem item = items.get(i);
            EsEventOutbox event = events.get(i);

            if (item.error() == null) {
                result.addSuccess(event);
            } else {
                log.warn("ES 색인 실패 (EventID: {}) - reason: {}", event.getId(), item.error().reason());
                result.addFail(event);
            }
        }
    }

    private void updateEventsState(ProcessingResult result) {
        processSuccessfulEvents(result.getSuccess());
        processFailedEvents(result.getFail());
    }

    private void processSuccessfulEvents(List<EsEventOutbox> successEvents) {
        if (successEvents.isEmpty()) return;

        List<Long> ids = successEvents.stream()
                .map(EsEventOutbox::getId)
                .toList();
        outboxRepository.markAsProcessed(ids, LocalDateTime.now());
    }

    private void processFailedEvents(List<EsEventOutbox> failedEvents) {
        if (failedEvents.isEmpty()) return;

        List<Long> toIncrement = new ArrayList<>();
        List<Long> toMarkFailed = new ArrayList<>();

        for (EsEventOutbox failed : failedEvents) {
            if (failed.getFailCount() + 1 >= MAX_RETRIES) {
                toMarkFailed.add(failed.getId());
            } else {
                toIncrement.add(failed.getId());
            }
        }

        if (!toIncrement.isEmpty()) outboxRepository.incrementFailCount(toIncrement);
        if (!toMarkFailed.isEmpty()) outboxRepository.markAsFailed(toMarkFailed);
    }

    private static class ProcessingResult {
        private final List<EsEventOutbox> success = new ArrayList<>();
        private final List<EsEventOutbox> fail = new ArrayList<>();

        public void addSuccess(EsEventOutbox event) {
            success.add(event);
        }

        public void addFail(EsEventOutbox event) {
            fail.add(event);
        }

        public List<EsEventOutbox> getSuccess() {
            return success;
        }

        public List<EsEventOutbox> getFail() {
            return fail;
        }
    }
}
