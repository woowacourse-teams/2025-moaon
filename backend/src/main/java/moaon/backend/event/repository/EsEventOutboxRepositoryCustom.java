package moaon.backend.event.repository;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventStatus;

public interface EsEventOutboxRepositoryCustom {

    List<EsEventOutbox> findEventsByStatus(EventStatus status, int batchSize);

    void markAsProcessed(List<Long> ids, LocalDateTime processedTime);

    void incrementFailCount(List<Long> ids);

    void markAsFailed(List<Long> ids);
}
