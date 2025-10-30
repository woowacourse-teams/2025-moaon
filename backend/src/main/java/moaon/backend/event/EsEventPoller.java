package moaon.backend.event;

import co.elastic.clients.elasticsearch.core.BulkResponse;
import co.elastic.clients.elasticsearch.core.bulk.BulkResponseItem;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventAction;
import moaon.backend.event.dto.PreparedEvent;
import moaon.backend.event.repository.EsEventOutboxRepository;
import moaon.backend.global.elastic.IndexNameResolver;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EsEventPoller {

    private final EsEventOutboxRepository outboxRepository;
    private final PolledDocumentIndexer polledDocumentIndexer;
    private final ObjectMapper objectMapper;
    private final IndexNameResolver indexNameResolver;

    private static final int BATCH_SIZE = 100;
    private static final int MAX_RETRIES = 5;

    @Scheduled(fixedDelay = 2000)
    @Transactional
    public void pollAndProcessEvents() {
        List<EsEventOutbox> events = outboxRepository.findPendingEvents(BATCH_SIZE);
        if (events.isEmpty()) {
            return;
        }

        List<PreparedEvent> preparedEvents = new ArrayList<>();
        List<EsEventOutbox> esFailedEvents = new ArrayList<>();

        validateAndSeparateEvents(events, preparedEvents, esFailedEvents);

        List<EsEventOutbox> successfulEvents = new ArrayList<>();

        try {
            if (!preparedEvents.isEmpty()) {
                BulkResponse esResponse = polledDocumentIndexer.processEvents(preparedEvents);
                processBulkResponse(esResponse, preparedEvents, successfulEvents, esFailedEvents);
            }
        } catch (IOException e) {
            log.error("ES Bulk API 통신 실패");
            throw new CustomException(ErrorCode.ES_PROCESSING_FAILED);
        } catch (Exception e) {
            log.error("Outbox Poller 알 수 없는 예외 발생: {}", e.getMessage(), e);
            esFailedEvents.addAll(
                    preparedEvents.stream()
                    .map(PreparedEvent::event)
                    .toList()
            );
        }

        updateEventsState(successfulEvents, esFailedEvents);
    }

    private void validateAndSeparateEvents(
            List<EsEventOutbox> events,
            List<PreparedEvent> preparedEvents,
            List<EsEventOutbox> esFailedEvents
    ) {
        for (EsEventOutbox event : events) {
            try {
                PreparedEvent prepared = prepareEvent(event);
                preparedEvents.add(prepared);
            } catch (JsonProcessingException | IllegalArgumentException e) {
                log.warn("ES 색인 과정 중 실패 (EventID: {}). 이 이벤트는 격리됩니다.", event.getId());
                esFailedEvents.add(event);
            }
        }
    }

    private PreparedEvent prepareEvent(EsEventOutbox event) throws JsonProcessingException {
        String indexName = indexNameResolver.getIndexName(event.getEventType());

        if (event.getAction() == EventAction.DELETED) {
            return new PreparedEvent(event, null, indexName);
        }

        JsonNode payloadNode = objectMapper.readTree(event.getPayload());
        return new PreparedEvent(event, payloadNode, indexName);
    }

    private void processBulkResponse(
            BulkResponse esResponse,
            List<PreparedEvent> preparedEvents,
            List<EsEventOutbox> successfulEvents,
            List<EsEventOutbox> esFailedEvents
    ) {
        if (esResponse == null || esResponse.items() == null) {
            return;
        }

        List<BulkResponseItem> items = esResponse.items();
        for (int i = 0; i < items.size(); i++) {
            BulkResponseItem item = items.get(i);
            EsEventOutbox processedEvent = preparedEvents.get(i).event();
            if (item.error() == null) {
                successfulEvents.add(processedEvent);
            }
            if (item.error() != null) {
                log.warn("ES 색인 처리 실패 (EventID: {})", processedEvent.getId());
                esFailedEvents.add(processedEvent);
            }
        }
    }

    private void updateEventsState(
            List<EsEventOutbox> successfulEvents,
            List<EsEventOutbox> esFailedEvents
    ) {
        processSuccessfulEvents(successfulEvents);
        processFailedEvents(esFailedEvents);
    }

    private void processSuccessfulEvents(List<EsEventOutbox> successfulEvents) {
        if (successfulEvents.isEmpty()) {
            return;
        }
        LocalDateTime processedTime = LocalDateTime.now();
        List<Long> successfulIds = successfulEvents.stream()
                .map(EsEventOutbox::getId)
                .toList();
        outboxRepository.markAsProcessed(successfulIds, processedTime);
    }

    private void processFailedEvents(List<EsEventOutbox> allFailedEvents) {
        if (allFailedEvents.isEmpty()) {
            return;
        }

        List<Long> idsToIncrement = new ArrayList<>();
        List<Long> idsToMarkFailed = new ArrayList<>();

        classifyFailedEvents(allFailedEvents, idsToIncrement, idsToMarkFailed);

        if (!idsToIncrement.isEmpty()) {
            outboxRepository.incrementFailCount(idsToIncrement);
        }
        if (!idsToMarkFailed.isEmpty()) {
            outboxRepository.markAsFailed(idsToMarkFailed);
        }
    }

    private void classifyFailedEvents(
            List<EsEventOutbox> allFailedEvents,
            List<Long> idsToIncrement,
            List<Long> idsToMarkFailed
    ) {
        for (EsEventOutbox failedEvent : allFailedEvents) {
            if (failedEvent.getFailCount() + 1 >= MAX_RETRIES) {
                idsToMarkFailed.add(failedEvent.getId());
            } else {
                idsToIncrement.add(failedEvent.getId());
            }
        }
    }
}
