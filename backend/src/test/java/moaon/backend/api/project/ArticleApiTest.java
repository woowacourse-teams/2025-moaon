package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCategory;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.fixture.ArticleFixtureBuilder;
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
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
@Import({RepositoryHelper.class, QueryDslConfig.class})
public class ArticleApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("GET /articles : 페이징 방식의 프로젝트 조회 API")
    @Test
    void getPagedArticles() {
        // given
        ArticleCategory filteredArticleCategory = Fixture.anyArticleCategory();
        ArticleCategory unfilteredArticleCategory = Fixture.anyArticleCategory();

        TechStack filteredTechStack = Fixture.anyTechStack();
        TechStack unfilteredTechStack = Fixture.anyTechStack();

        Project project = repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(filteredArticleCategory)
                        .techStacks(List.of(unfilteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(unfilteredArticleCategory)
                        .techStacks(List.of(unfilteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(unfilteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(6)
                        .build()
        );

        Article articleClickRankFirst = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(3)
                        .build()
        );

        Article articleClickRankSecond = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(2)
                        .build()
        );

        Article articleRankThirdHasSmallId = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .build()
        );

        Article articleRankThirdHasBiggerId = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .build()
        );

        // when
        ArticleResponse actualResponse = RestAssured.given().log().all()
                .queryParams("sort", "clicks")
                .queryParams("category", filteredArticleCategory.getName())
                .queryParams("techStacks", List.of(filteredTechStack.getName()))
                .queryParams("limit", 3)
                .queryParams("cursor", "5_6")
                .when().get("/articles")
                .then().log().all()
                .statusCode(200)
                .extract().as(ArticleResponse.class);

        // then
        assertAll(
                () -> assertThat(actualResponse.contents()).hasSize(3),
                () -> assertThat(actualResponse.contents().getFirst().id()).isEqualTo(
                        articleClickRankFirst.getId()),
                () -> assertThat(actualResponse.contents().get(1).id()).isEqualTo(
                        articleClickRankSecond.getId()),
                () -> assertThat(actualResponse.contents().get(2).id()).isEqualTo(
                        articleRankThirdHasBiggerId.getId())
        );
    }
}
