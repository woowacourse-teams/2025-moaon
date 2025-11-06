package moaon.backend.article.sync;

import co.elastic.clients.elasticsearch.core.BulkResponse;
import co.elastic.clients.elasticsearch.core.bulk.BulkResponseItem;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import moaon.backend.event.repository.EventOutboxRepository;
import moaon.backend.global.exception.custom.CustomException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class ArticleSyncScheduler {

    private final EventOutboxRepository outboxRepository;
    private final ArticleEsSender articleEsSender;
    private final ObjectMapper objectMapper;

    private static final int BATCH_SIZE = 100;
    private static final int MAX_RETRIES = 5;

    @Scheduled(fixedDelay = 2000)
    @Transactional
    public void pollAndProcessEvents() {
        try {
            List<EventOutbox> events = outboxRepository.findEventsByStatus(EventStatus.PENDING, BATCH_SIZE);
            if (events.isEmpty()) return;

            ProcessingResult result = processEvents(events);
            updateEventsState(result);

        } catch (Exception e) {
            log.error("Outbox Poller 실행 중 예외 발생: {}", e.getMessage(), e);
        }
    }

    private ProcessingResult processEvents(List<EventOutbox> events) throws IOException {
        ProcessingResult result = new ProcessingResult();

        List<EventOutbox> validEvents = validateEvents(events, result);
        if (validEvents.isEmpty()) return result;

        BulkResponse response = articleEsSender.processEvents(validEvents);
        handleBulkResponse(response, validEvents, result);

        return result;
    }

    private List<EventOutbox> validateEvents(List<EventOutbox> events, ProcessingResult result) {
        List<EventOutbox> validEvents = new ArrayList<>();

        for (EventOutbox event : events) {
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

    private void handleBulkResponse(BulkResponse response, List<EventOutbox> events, ProcessingResult result) {
        if (response == null || response.items() == null) return;

        List<BulkResponseItem> items = response.items();
        for (int i = 0; i < items.size(); i++) {
            BulkResponseItem item = items.get(i);
            EventOutbox event = events.get(i);

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

    private void processSuccessfulEvents(List<EventOutbox> successEvents) {
        if (successEvents.isEmpty()) return;

        List<Long> ids = successEvents.stream()
                .map(EventOutbox::getId)
                .toList();
        outboxRepository.markAsProcessed(ids, LocalDateTime.now());
    }

    private void processFailedEvents(List<EventOutbox> failedEvents) {
        if (failedEvents.isEmpty()) return;

        List<Long> toIncrement = new ArrayList<>();
        List<Long> toMarkFailed = new ArrayList<>();

        for (EventOutbox failed : failedEvents) {
            if (failed.getFailCount() + 1 >= MAX_RETRIES) {
                toMarkFailed.add(failed.getId());
            } else {
                toIncrement.add(failed.getId());
            }
        }

        if (!toIncrement.isEmpty()) outboxRepository.incrementFailCount(toIncrement);
        if (!toMarkFailed.isEmpty()) outboxRepository.markAsFailed(toMarkFailed);
    }

    @Getter
    private static class ProcessingResult {
        private final List<EventOutbox> success = new ArrayList<>();
        private final List<EventOutbox> fail = new ArrayList<>();

        public void addSuccess(EventOutbox event) {
            success.add(event);
        }

        public void addFail(EventOutbox event) {
            fail.add(event);
        }
    }
}
