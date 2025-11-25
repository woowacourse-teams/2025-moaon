package moaon.backend.event.repository;

import java.time.LocalDateTime;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventOutboxRepository extends JpaRepository<EventOutbox, Long>, EventOutboxRepositoryCustom {

    int deleteByStatusAndProcessedAtBefore(EventStatus eventStatus, LocalDateTime cutoffTime);
}
