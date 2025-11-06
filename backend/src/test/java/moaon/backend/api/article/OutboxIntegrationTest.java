package moaon.backend.api.article;

import static org.assertj.core.api.Assertions.assertThat;
import static org.testcontainers.shaded.org.awaitility.Awaitility.await;

import io.restassured.RestAssured;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.repository.db.ArticleDBRepository;
import moaon.backend.article.repository.es.ArticleDocumentOperations;
import moaon.backend.article.service.ArticleService;
import moaon.backend.article.sync.ArticleSyncScheduler;
import moaon.backend.event.repository.EventOutboxRepository;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Disabled
@Testcontainers
@Import({RepositoryHelper.class, QueryDslConfig.class})
class OutboxIntegrationTest {

    @Container
    @ServiceConnection
    private static final ElasticsearchContainer container = new ElasticsearchContainer(
            DockerImageName.parse("docker.elastic.co/elasticsearch/elasticsearch:8.11.0"))
            .withEnv("ES_JAVA_OPTS", "-Xms512m -Xmx512m")
            .withEnv("xpack.security.enabled", "false")
            .withEnv("discovery.type", "single-node")
            .withStartupTimeout(Duration.ofMinutes(5))
            .withCommand("sh", "-c", "elasticsearch-plugin install --batch analysis-nori && exec bin/elasticsearch");

    @LocalServerPort
    private int port;

    @Autowired
    protected RepositoryHelper repositoryHelper;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ArticleDBRepository articleDBRepository;

    @Autowired
    private EventOutboxRepository outboxRepository;

    @Autowired
    private ArticleDocumentOperations articleDocumentRepository;

    @Autowired
    private ArticleSyncScheduler eventPoller;

    @Autowired
    private ElasticsearchOperations ops;

    private Project project;
    private TechStack techStack;

    @BeforeEach
    void setUp() {
        await().untilAsserted(
                () -> assertThat(container.isRunning()).isTrue()
        );
        IndexOperations indexOps = ops.indexOps(ArticleDocument.class);
        indexOps.createWithMapping();
        indexOps.refresh();
        RestAssured.port = port;
        ProjectFixtureBuilder projectFixtureBuilder = new ProjectFixtureBuilder();
        project = repositoryHelper.save(
                projectFixtureBuilder.build()
        );
        techStack = Fixture.anyTechStack();
        repositoryHelper.save(techStack);
    }

    @Test
    @DisplayName("Article 생성 시 Outbox 이벤트를 통해 Elasticsearch에 최종적으로 색인된다")
    void articleCreation_ShouldBeIndexed_ViaOutboxPoller() throws MalformedURLException {
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
        articleService.save(List.of(request), project.getAuthor());

        eventPoller.pollAndProcessEvents();

        // then
        Article savedArticle = articleDBRepository.findAll().get(0);
        await().atMost(Duration.ofSeconds(5))
                .pollInterval(Duration.ofMillis(500))
                .untilAsserted(() -> {
                    ops.indexOps(ArticleDocument.class).refresh();
                    ArticleDocument esDocument = articleDocumentRepository.searchInIds(
                            List.of(savedArticle.getId()),
                            new ArticleQueryConditionBuilder()
                                    .sortBy(ArticleSortType.CREATED_AT)
                                    .build()
                    ).getSearchHits().get(0).getContent();
                    assertThat(esDocument.getTitle()).isEqualTo("테스트 제목");
                    assertThat(esDocument.getSummary()).isEqualTo("테스트 요약");
                    assertThat(esDocument.getTechStacks()).containsExactlyInAnyOrder(techStack.getName());
                });
    }
}
