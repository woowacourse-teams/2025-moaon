package moaon.backend.api.article;

import static org.assertj.core.api.Assertions.assertThat;
import static org.testcontainers.shaded.org.awaitility.Awaitility.await;

import io.restassured.RestAssured;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleContent;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;
import moaon.backend.techStack.repository.TechStackRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class ArticleESApiTest {

    @Container
    @ServiceConnection
    private static final ElasticsearchContainer container = new ElasticsearchContainer(
            DockerImageName.parse("docker.elastic.co/elasticsearch/elasticsearch:9.1.4"))
            .withEnv("xpack.security.transport.ssl.enabled", "false")
            .withEnv("xpack.security.http.ssl.enabled", "false")
            .withEnv("xpack.security.enabled", "false")
            .withCommand("sh", "-c", "elasticsearch-plugin install --batch analysis-nori && exec bin/elasticsearch");

    @LocalServerPort
    private int port;

    @Autowired
    private ElasticsearchOperations ops;

    @Autowired
    private ArticleDocumentRepository articleDocumentRepository;

    @Autowired
    private TechStackRepository techStackRepository;

    @MockitoBean
    private ArticleRepository repository;

    @BeforeEach
    void setUp() {
        await().untilAsserted(
                () -> assertThat(container.isRunning()).isTrue()
        );
        IndexOperations indexOps = ops.indexOps(ArticleDocument.class);
        indexOps.createWithMapping();
        indexOps.refresh();
        RestAssured.port = port;
    }

    @DisplayName("GET /articles : 페이징 방식의 아티클 조회 API")
    @Test
    void getPagedArticles() {
        // given
        Sector filteredSector = Sector.BE;
        Sector unfilteredSector = Sector.FE;
        Topic filteredTopic = Topic.DATABASE;
        Topic unfilteredTopic = Topic.API_DESIGN;
        TechStack filteredTechStack = techStackRepository.save(Fixture.anyTechStack());
        TechStack unfilteredTechStack = techStackRepository.save(Fixture.anyTechStack());
        String filteredSearch = "moa";
        String unfilteredSearch = "momo";
        Project project = Project.builder().id(1L).build();

        articleDocumentRepository.save(new ArticleDocument(
                new ArticleFixtureBuilder()
                        .id(1L)
                        .sector(unfilteredSector)
                        .content(filteredSearch)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(4)
                        .topics(filteredTopic)
                        .build()
        ));
        articleDocumentRepository.save(new ArticleDocument(
                new ArticleFixtureBuilder()
                        .id(2L)
                        .techStacks(List.of(unfilteredTechStack))
                        .content(filteredSearch)
                        .sector(filteredSector)
                        .project(project)
                        .clicks(4)
                        .topics(filteredTopic)
                        .build()
        ));
        articleDocumentRepository.save(new ArticleDocument(
                new ArticleFixtureBuilder()
                        .id(3L)
                        .title(unfilteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .topics(filteredTopic)
                        .build()
        ));
        articleDocumentRepository.save(new ArticleDocument(
                new ArticleFixtureBuilder()
                        .id(4L)
                        .summary(unfilteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .topics(filteredTopic)
                        .build()
        ));
        articleDocumentRepository.save(new ArticleDocument(
                new ArticleFixtureBuilder()
                        .id(5L)
                        .content(unfilteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(unfilteredTechStack))
                        .project(project)
                        .clicks(4)
                        .topics(filteredTopic)
                        .build()
        ));
        articleDocumentRepository.save(new ArticleDocument(
                new ArticleFixtureBuilder()
                        .id(6L)
                        .topics(unfilteredTopic)
                        .content(filteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        ));
        ArticleDocument articleClickRankThird = articleDocumentRepository.save(new ArticleDocument(
                new ArticleFixtureBuilder()
                        .id(7L)
                        .content(filteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .topics(filteredTopic)
                        .build()
        ));
        Article article8 = new ArticleFixtureBuilder()
                .id(8L)
                .title(filteredSearch)
                .sector(filteredSector)
                .techStacks(List.of(filteredTechStack))
                .project(project)
                .clicks(2)
                .topics(filteredTopic)
                .build();
        ArticleDocument articleClickRankSecond = articleDocumentRepository.save(new ArticleDocument(article8));

        Article article9 = new ArticleFixtureBuilder()
                .id(9L)
                .content(filteredSearch)
                .sector(filteredSector)
                .techStacks(List.of(filteredTechStack))
                .project(project)
                .clicks(3)
                .topics(filteredTopic)
                .build();
        ArticleDocument articleClickRankFirst = articleDocumentRepository.save(new ArticleDocument(article9));

        Mockito.when(repository.findAllById(List.of(9L, 8L))).thenReturn(List.of(article9, article8));

        // when
        ArticleResponse actualResponse = RestAssured.given().log().all()
                .queryParams("sort", "clicks")
                .queryParams("search", filteredSearch)
                .queryParams("sector", filteredSector.getName())
                .queryParams("topics", List.of(filteredTopic.getName()))
                .queryParams("techStacks", List.of(filteredTechStack.getName()))
                .queryParams("limit", 2)
                .queryParams("cursor", "5_6")
                .when().get("/es/search")
                .then().log().all()
                .statusCode(200)
                .extract().as(ArticleResponse.class);

        // then
        assertThat(actualResponse.contents())
                .extracting(ArticleContent::id)
                .containsExactly(articleClickRankFirst.getId(), articleClickRankSecond.getId());
    }
}
