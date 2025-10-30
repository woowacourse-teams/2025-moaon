package moaon.backend.event.repository;

import java.time.LocalDateTime;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EsEventOutboxRepository extends JpaRepository<EsEventOutbox, Long>, EsEventOutboxRepositoryCustom {
    int deleteByStatusAndProcessedAtBefore(EventStatus eventStatus, LocalDateTime cutoffTime);
    int deleteByStatusAndCreatedAtBefore(EventStatus eventStatus, LocalDateTime cutoffTime);
}
