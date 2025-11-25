package moaon.backend.event.repository;

import static moaon.backend.event.domain.QEventOutbox.eventOutbox;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
@RequiredArgsConstructor
public class EventOutboxRepositoryImpl implements EventOutboxRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    @Transactional(readOnly = true)
    public List<EventOutbox> findEventsByStatus(EventStatus status, int batchSize) {
        return queryFactory
                .selectFrom(eventOutbox)
                .where(eventOutbox.status.eq(status))
                .orderBy(eventOutbox.createdAt.asc())
                .limit(batchSize)
                .fetch();
    }

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