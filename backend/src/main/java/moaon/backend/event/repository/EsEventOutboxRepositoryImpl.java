package moaon.backend.event.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventStatus;

import static moaon.backend.event.domain.QEsEventOutbox.esEventOutbox;

@RequiredArgsConstructor
public class EsEventOutboxRepositoryImpl implements EsEventOutboxRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<EsEventOutbox> findEventsByStatus(EventStatus status, int batchSize) {
        return queryFactory
                .selectFrom(esEventOutbox)
                .where(esEventOutbox.status.eq(status))
                .orderBy(esEventOutbox.createdAt.asc())
                .limit(batchSize)
                .fetch();
    }

    @Override
    public void markAsProcessed(List<Long> ids, LocalDateTime processedTime) {
        queryFactory
                .update(esEventOutbox)
                .set(esEventOutbox.processedAt, processedTime)
                .set(esEventOutbox.status, EventStatus.PROCESSED)
                .where(esEventOutbox.id.in(ids))
                .execute();
    }

    @Override
    public void incrementFailCount(List<Long> ids) {
        queryFactory
                .update(esEventOutbox)
                .set(esEventOutbox.failCount, esEventOutbox.failCount.add(1))
                .where(esEventOutbox.id.in(ids))
                .execute();
    }

    @Override
    public void markAsFailed(List<Long> ids) {
        queryFactory
                .update(esEventOutbox)
                .set(esEventOutbox.status, EventStatus.FAILED)
                .where(esEventOutbox.id.in(ids))
                .execute();
    }
}
