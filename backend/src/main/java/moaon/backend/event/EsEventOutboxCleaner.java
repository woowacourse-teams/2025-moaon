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


    @Scheduled(cron = "0 0 3 * * *") // 매일 새벽 3시
    @Transactional
    public void cleanupOldEvents() {
        int retentionDays = 7;

        LocalDateTime cutoffTime = LocalDateTime.now().minusDays(retentionDays);

        int deletedCount = outboxRepository.deleteByStatusAndProcessedAtBefore(
                EventStatus.PROCESSED,
                cutoffTime
        );

        if (deletedCount > 0) {
            log.info("오래된 Outbox 이벤트 {}건 삭제 완료 (기준: {}일 이전)",
                    deletedCount, retentionDays);
        }
    }
}
