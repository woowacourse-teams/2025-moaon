package moaon.backend.event.repository;

import moaon.backend.event.domain.EsEventOutbox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EsEventOutboxRepository extends JpaRepository<EsEventOutbox, Long> {
}
