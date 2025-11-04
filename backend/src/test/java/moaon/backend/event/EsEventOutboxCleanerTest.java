package moaon.backend.event;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

import java.time.LocalDateTime;
import moaon.backend.event.domain.EventStatus;
import moaon.backend.event.repository.EsEventOutboxRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EsEventOutboxCleanerTest {

    @Mock
    private EsEventOutboxRepository outboxRepository;

    @InjectMocks
    private EsEventOutboxCleaner cleaner;

    @DisplayName("7일 이전의 처리 완료된 이벤트를 삭제한다")
    @Test
    void cleanupOldEvents_deletesProcessedEvents() {
        // given
        when(outboxRepository.deleteByStatusAndProcessedAtBefore(
                eq(EventStatus.PROCESSED),
                any(LocalDateTime.class)
        )).thenReturn(10);

        // when
        cleaner.cleanupOldEvents();

        // then
        ArgumentCaptor<LocalDateTime> timeCaptor = ArgumentCaptor.forClass(LocalDateTime.class);
        verify(outboxRepository).deleteByStatusAndProcessedAtBefore(
                eq(EventStatus.PROCESSED),
                timeCaptor.capture()
        );

        LocalDateTime capturedTime = timeCaptor.getValue();
        LocalDateTime expectedTime = LocalDateTime.now().minusDays(7);

        // 시간 차이가 1초 이내인지 확인 (테스트 실행 시간 고려)
        assertThat(capturedTime).isBetween(
                expectedTime.minusSeconds(1),
                expectedTime.plusSeconds(1)
        );
    }

    @DisplayName("삭제할 이벤트가 없으면 로그만 출력하고 정상 종료한다")
    @Test
    void cleanupOldEvents_noEventsToDelete() {
        // given
        when(outboxRepository.deleteByStatusAndProcessedAtBefore(
                eq(EventStatus.PROCESSED),
                any(LocalDateTime.class)
        )).thenReturn(0);

        // when
        cleaner.cleanupOldEvents();

        // then
        verify(outboxRepository, times(1)).deleteByStatusAndProcessedAtBefore(
                eq(EventStatus.PROCESSED),
                any(LocalDateTime.class)
        );
    }

    @DisplayName("30일 이전의 실패한 이벤트를 삭제한다")
    @Test
    void cleanupFailedEvents_deletesFailedEvents() {
        // given
        when(outboxRepository.deleteByStatusAndCreatedAtBefore(
                eq(EventStatus.FAILED),
                any(LocalDateTime.class)
        )).thenReturn(5);

        // when
        cleaner.cleanupFailedEvents();

        // then
        ArgumentCaptor<LocalDateTime> timeCaptor = ArgumentCaptor.forClass(LocalDateTime.class);
        verify(outboxRepository).deleteByStatusAndCreatedAtBefore(
                eq(EventStatus.FAILED),
                timeCaptor.capture()
        );

        LocalDateTime capturedTime = timeCaptor.getValue();
        LocalDateTime expectedTime = LocalDateTime.now().minusDays(30);

        assertThat(capturedTime).isBetween(
                expectedTime.minusSeconds(1),
                expectedTime.plusSeconds(1)
        );
    }

    @DisplayName("삭제할 실패 이벤트가 없으면 로그만 출력하고 정상 종료한다")
    @Test
    void cleanupFailedEvents_noEventsToDelete() {
        // given
        when(outboxRepository.deleteByStatusAndCreatedAtBefore(
                eq(EventStatus.FAILED),
                any(LocalDateTime.class)
        )).thenReturn(0);

        // when
        cleaner.cleanupFailedEvents();

        // then
        verify(outboxRepository, times(1)).deleteByStatusAndCreatedAtBefore(
                eq(EventStatus.FAILED),
                any(LocalDateTime.class)
        );
    }
}
