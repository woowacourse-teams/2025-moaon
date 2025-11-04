package moaon.backend.event;

import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.event.domain.EventStatus;
import moaon.backend.event.repository.EsEventOutboxRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class EsEventOutboxCleaner {

    private final EsEventOutboxRepository outboxRepository;

    private static final int RETENTION_DAYS = 7;

    @Scheduled(cron = "0 0 3 * * *") // 매일 새벽 3시
    @Transactional
    public void cleanupOldEvents() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusDays(RETENTION_DAYS);

        int deletedCount = outboxRepository.deleteByStatusAndProcessedAtBefore(
                EventStatus.PROCESSED,
                cutoffTime
        );

        if (deletedCount > 0) {
            log.info("오래된 Outbox 이벤트 {}건 삭제 완료 (기준: {}일 이전)",
                    deletedCount, RETENTION_DAYS);
        }
    }

    @Scheduled(cron = "0 30 3 * * *") // 매일 새벽 3시 30분
    @Transactional
    public void cleanupFailedEvents() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusDays(30);

        int deletedCount = outboxRepository.deleteByStatusAndCreatedAtBefore(
                EventStatus.FAILED,
                cutoffTime
        );

        if (deletedCount > 0) {
            log.info("오래된 실패 이벤트 {}건 삭제 완료 (기준: 30일 이전)", deletedCount);
        }
    }
}
