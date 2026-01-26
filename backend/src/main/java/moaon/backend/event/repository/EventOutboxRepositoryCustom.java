package moaon.backend.event.repository;

import java.util.List;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventOutboxRepositoryCustom {

    void markAsProcessing(List<Long> ids);

    void markAsProcessed(List<Long> ids);

    void incrementFailCount(List<Long> ids);

    void markAsFailed(List<Long> ids);
}
