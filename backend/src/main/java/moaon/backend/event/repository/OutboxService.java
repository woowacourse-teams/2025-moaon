package moaon.backend.event.repository;

import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OutboxService {

    private final EventOutboxRepository outboxRepository;

    @Transactional
    public List<EventOutbox> getEventsForIndexing(EventStatus status, int batchSize) {
        List<EventOutbox> events = outboxRepository.findEventsByStatus(status.getStatus(), batchSize);

        outboxRepository.markAsProcessing(
                events.stream()
                        .map(EventOutbox::getId)
                        .toList()
        );

        return events;
    }
}
