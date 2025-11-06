package moaon.backend.api.article;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import co.elastic.clients.elasticsearch.core.BulkResponse;
import co.elastic.clients.elasticsearch.core.bulk.BulkResponseItem;
import jakarta.persistence.EntityManager;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.service.ArticleService;
import moaon.backend.article.sync.ArticleEsSender;
import moaon.backend.article.sync.ArticleSyncScheduler;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.domain.EventStatus;
import moaon.backend.event.repository.EventOutboxRepository;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Import({RepositoryHelper.class, QueryDslConfig.class})
@Transactional
class OutboxIntegrationTest {

    @Autowired
    private RepositoryHelper repositoryHelper;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private EventOutboxRepository outboxRepository;

    @Autowired
    private ArticleSyncScheduler eventPoller;

    @MockitoBean
    private ArticleEsSender articleEsSender;

    @Autowired
    private EntityManager em;

    private Project project;
    private TechStack techStack;

    @BeforeEach
    void setUp() {
        ProjectFixtureBuilder projectFixtureBuilder = new ProjectFixtureBuilder();
        project = repositoryHelper.save(projectFixtureBuilder.build());
        techStack = repositoryHelper.save(Fixture.anyTechStack());
    }

    @Test
    @DisplayName("Article 생성 시 Outbox 이벤트가 PROCESSED로 변경된다")
    void articleCreation_ShouldTriggerOutboxPolling() throws IOException {
        // given
        ArticleCreateRequest request = ArticleCreateRequest.builder()
                .projectId(project.getId())
                .title("테스트 제목")
                .summary("테스트 요약")
                .techStacks(List.of(techStack.getName()))
                .url(new URL("https://example.com/article1"))
                .sector("be")
                .topics(List.of("database"))
                .build();

        BulkResponse mockResponse = mock(BulkResponse.class);
        BulkResponseItem mockItem = mock(BulkResponseItem.class);

        when(mockResponse.errors()).thenReturn(false);
        when(mockResponse.items()).thenReturn(List.of(mockItem));
        when(mockItem.error()).thenReturn(null);
        when(articleEsSender.processEvents(any())).thenReturn(mockResponse);

        // when
        articleService.save(List.of(request), project.getAuthor());
        eventPoller.pollAndProcessEvents();
        em.flush();
        em.clear();

        // then
        List<EventOutbox> outboxes = outboxRepository.findAll();
        assertThat(outboxes).hasSize(1);
        assertThat(outboxes.get(0).getStatus()).isEqualTo(EventStatus.PROCESSED);
    }
}
