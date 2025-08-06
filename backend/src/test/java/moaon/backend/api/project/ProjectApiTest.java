package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import io.restassured.response.ValidatableResponse;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import({RepositoryHelper.class, QueryDslConfig.class})
public class ProjectApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("GET /projects/{id} : 프로젝트 단건 조회 API")
    @Test
    void findProject() {
        // given
        Project project = repositoryHelper.save(new ProjectFixtureBuilder().build());

        // when & then 첫 조회 - 기본 응답 + 조회수 증가 + 쿠키 설정
        ValidatableResponse firstResponse = RestAssured.given().log().all()
                .pathParam("id", project.getId())
                .when().get("/projects/{id}")
                .then().log().all()
                .statusCode(200);

        ProjectDetailResponse firstResult = firstResponse.extract().as(ProjectDetailResponse.class);
        String cookie = firstResponse.extract().cookie("viewed_projects");

        // then 기본 응답 검증
        assertAll("프로젝트 기본 정보 및 첫 조회 검증",
                () -> assertThat(firstResult.title()).isEqualTo(project.getTitle()),
                () -> assertThat(firstResult.summary()).isEqualTo(project.getSummary()),
                () -> assertThat(firstResult.description()).isEqualTo(project.getDescription()),
                () -> assertThat(firstResult.techStacks())
                        .isEqualTo(project.getTechStacks().stream().map(TechStack::getName).toList()),
                () -> assertThat(firstResult.loves()).isEqualTo(0),
                () -> assertThat(firstResult.views()).isEqualTo(1), // 조회수 증가
                () -> assertThat(cookie).isNotNull() // 쿠키 설정
        );

        // when & then 쿠키와 함께 재조회 - 조회수 미증가 확인
        ProjectDetailResponse secondResult = RestAssured.given().log().all()
                .cookie("viewed_projects", cookie)
                .pathParam("id", project.getId())
                .when().get("/projects/{id}")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectDetailResponse.class);

        // then 쿠키 동작 검증
        assertThat(secondResult.views()).isEqualTo(1); // 조회수 미증가
    }

    @DisplayName("GET /projects : 모든 프로젝트 조회 API")
    @Test
    void getAllProjects() {
        // given
        String filteredSearch = "모아온";
        String unfilteredSearch = "모모온";
        ProjectCategory filteredProjectCategory = Fixture.anyProjectCategory();
        ProjectCategory unfilteredProjectCategory = Fixture.anyProjectCategory();
        TechStack filteredTechStack = Fixture.anyTechStack();
        TechStack unfilteredTechStack = Fixture.anyTechStack();

        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(unfilteredSearch)
                        .categories(filteredProjectCategory)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .categories(unfilteredProjectCategory)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .categories(filteredProjectCategory)
                        .techStacks(unfilteredTechStack)
                        .build()
        );

        Project projectViewRankThird = repositoryHelper.save(new ProjectFixtureBuilder()
                .description(filteredSearch)
                .categories(filteredProjectCategory)
                .techStacks(filteredTechStack)
                .views(1)
                .build()
        );
        Project projectViewRankSecond = repositoryHelper.save(new ProjectFixtureBuilder()
                .summary(filteredSearch)
                .categories(filteredProjectCategory)
                .techStacks(filteredTechStack)
                .views(2)
                .build()
        );
        Project projectViewRankFirst = repositoryHelper.save(new ProjectFixtureBuilder()
                .title(filteredSearch)
                .categories(filteredProjectCategory)
                .techStacks(filteredTechStack)
                .views(3)
                .build()
        );

        // when
        PagedProjectResponse actualResponses = RestAssured.given().log().all()
                .queryParams("search", filteredSearch)
                .queryParams("sort", "views")
                .queryParams("categories", List.of(filteredProjectCategory.getName()))
                .queryParams("techStacks", List.of(filteredTechStack.getName()))
                .queryParams("limit", 2)
                .when().get("/projects")
                .then().log().all()
                .statusCode(200)
                .extract().as(PagedProjectResponse.class);

        // then
        assertAll(
                () -> assertThat(actualResponses.contents()).hasSize(2),
                () -> assertThat(actualResponses.contents().get(0).id()).isEqualTo(projectViewRankFirst.getId()),
                () -> assertThat(actualResponses.contents().get(1).id()).isEqualTo(projectViewRankSecond.getId())
        );
    }

    @DisplayName("GET /projects/{id}/articles : 특정 프로젝트 ID에 있는 모든 아티클 조회 API")
    @Test
    void getArticlesByProjectId() {
        // given
        Project targetProject = new ProjectFixtureBuilder().build();

        Article targetProjectArticle1 = repositoryHelper.save(
                new ArticleFixtureBuilder().project(targetProject).build()
        );
        Article targetProjectArticle2 = repositoryHelper.save(
                new ArticleFixtureBuilder().project(targetProject).build()
        );
        Article targetProjectArticle3 = repositoryHelper.save(
                new ArticleFixtureBuilder().project(targetProject).build()
        );

        repositoryHelper.save(new ArticleFixtureBuilder().build());

        // when
        ArticleDetailResponse[] actualArticles = RestAssured.given().log().all()
                .when().get("/projects/{id}/articles", targetProject.getId())
                .then().log().all()
                .statusCode(200)
                .extract().as(ArticleDetailResponse[].class);

        // then
        assertThat(actualArticles)
                .extracting(ArticleDetailResponse::id)
                .containsExactlyInAnyOrder(
                        targetProjectArticle1.getId(),
                        targetProjectArticle2.getId(),
                        targetProjectArticle3.getId()
                );
    }
}
