package moaon.backend.event.repository;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventOutboxRepository extends JpaRepository<EventOutbox, Long>, EventOutboxRepositoryCustom {

    @Query(
            value = """
                    SELECT *
                    FROM event_outbox oubox
                    WHERE oubox.status = :status
                    ORDER BY oubox.created_at
                    LIMIT :batchSize
                    FOR UPDATE SKIP LOCKED
                    """,
            nativeQuery = true
    )
    List<EventOutbox> findEventsByStatus(
            @Param("status") String status,
            @Param("batchSize") int batchSize
    );

    int deleteByStatusAndProcessedAtBefore(EventStatus eventStatus, LocalDateTime cutoffTime);
}
