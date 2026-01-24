package moaon.backend.event.repository;

import static moaon.backend.event.domain.QEventOutbox.eventOutbox;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.LockModeType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
@RequiredArgsConstructor
public class EventOutboxRepositoryImpl implements EventOutboxRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public void markAsProcessed(List<Long> ids) {
        queryFactory
                .update(eventOutbox)
                .set(eventOutbox.processedAt, LocalDateTime.now())
                .set(eventOutbox.status, EventStatus.PROCESSED)
                .where(eventOutbox.id.in(ids))
                .execute();
    }

    @Override
    public void incrementFailCount(List<Long> ids) {
        queryFactory
                .update(eventOutbox)
                .set(eventOutbox.failCount, eventOutbox.failCount.add(1))
                .set(eventOutbox.status, EventStatus.PENDING)
                .where(eventOutbox.id.in(ids))
                .execute();
    }

    @Override
    public void markAsFailed(List<Long> ids) {
        queryFactory
                .update(eventOutbox)
                .set(eventOutbox.status, EventStatus.FAILED)
                .where(eventOutbox.id.in(ids))
                .execute();
    }
}
