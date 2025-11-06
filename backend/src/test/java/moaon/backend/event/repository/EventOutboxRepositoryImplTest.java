package moaon.backend.event.repository;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import moaon.backend.event.domain.EventAction;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import moaon.backend.global.config.QueryDslConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Import(QueryDslConfig.class)
class EventOutboxRepositoryTest {

    @Autowired
    private EventOutboxRepository eventOutboxRepository;

    @Autowired
    private EntityManager em;

    @Test
    @DisplayName("특정 상태(PENDING)의 이벤트 목록을 오래된 순으로 N개 조회한다")
    void findEventsByStatus() {
        // given
        EventOutbox pendingEvent1 =  eventOutboxRepository.save(EventOutbox.builder()
                .entityId(1L)
                .eventType("articles")
                .action(EventAction.INSERT)
                .status(EventStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build());

        EventOutbox pendingEvent2 =  eventOutboxRepository.save(EventOutbox.builder()
                .entityId(2L)
                .eventType("articles")
                .action(EventAction.INSERT)
                .status(EventStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build());

        // when
        List<EventOutbox> foundEvents = eventOutboxRepository.findEventsByStatus(EventStatus.PENDING, 5);

        // then
        assertThat(foundEvents).hasSize(2);
        assertThat(foundEvents).extracting(EventOutbox::getStatus).containsOnly(EventStatus.PENDING);
        assertThat(foundEvents.get(0).getId()).isEqualTo(pendingEvent1.getId());
        assertThat(foundEvents.get(1).getId()).isEqualTo(pendingEvent2.getId());
    }

    @Test
    @DisplayName("ID 목록을 받아 상태를 PROCESSED로 변경한다")
    void markAsProcessed() {
        // given
        EventOutbox event1 =  eventOutboxRepository.save(EventOutbox.builder()
                .entityId(1L)
                .eventType("articles")
                .action(EventAction.INSERT)
                .status(EventStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build());

        EventOutbox event2 =  eventOutboxRepository.save(EventOutbox.builder()
                .entityId(2L)
                .eventType("articles")
                .action(EventAction.INSERT)
                .status(EventStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build());

        // when
        eventOutboxRepository.markAsProcessed(List.of(event1.getId(), event2.getId()));
        em.flush();
        em.clear();
        List<EventOutbox> processedEvents = eventOutboxRepository.findEventsByStatus(EventStatus.PROCESSED, 5);
        // then
        assertThat(processedEvents).hasSize(2);
        assertThat(processedEvents).extracting(EventOutbox::getStatus).containsOnly(EventStatus.PROCESSED);
    }

    @Test
    @DisplayName("ID 목록을 받아 실패 횟수를 1 증가시키고, 변경된 엔티티를 반환한다")
    void incrementFailCount() {
        // given
        EventOutbox event =  eventOutboxRepository.save(EventOutbox.builder()
                .entityId(1L)
                .eventType("articles")
                .action(EventAction.INSERT)
                .status(EventStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build());

        // when
        eventOutboxRepository.incrementFailCount(List.of(event.getId()));
        em.flush();
        em.clear();
        Optional<EventOutbox> findEvent = eventOutboxRepository.findById(event.getId());

        // then
        assertThat(findEvent.get().getFailCount()).isEqualTo(1);
        assertThat(findEvent.get().getStatus()).isEqualTo(EventStatus.PENDING);
    }

    @Test
    @DisplayName("ID 목록을 받아 상태를 FAILED로 변경하고, 변경된 엔티티를 반환한다")
    void markAsFailed() {
        // given
        EventOutbox event =  eventOutboxRepository.save(EventOutbox.builder()
                .entityId(1L)
                .eventType("articles")
                .action(EventAction.INSERT)
                .status(EventStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build());

        List<Long> idsToFail = List.of(event.getId());

        // when
        eventOutboxRepository.markAsFailed(idsToFail);
        em.flush();
        em.clear();
        Optional<EventOutbox> findEvent = eventOutboxRepository.findById(event.getId());

        // then
        assertThat(findEvent.get().getStatus()).isEqualTo(EventStatus.FAILED);
    }
}