package moaon.backend.event.repository;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.event.domain.EsEventOutbox;

public interface EsEventOutboxRepositoryCustom {

    List<EsEventOutbox> findPendingEvents(int batchSize);

    void markAsProcessed(List<Long> ids, LocalDateTime processedTime);

    void incrementFailCount(List<Long> ids);

    void markAsFailed(List<Long> ids);
}