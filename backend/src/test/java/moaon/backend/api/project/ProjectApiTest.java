package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectSummaryResponse;
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

        // when
        ProjectDetailResponse actualResponse = RestAssured.given().log().all()
                .pathParam("id", project.getId())
                .when().get("/projects/{id}")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectDetailResponse.class);

        // then
        assertAll(
                () -> assertThat(actualResponse.title()).isEqualTo(project.getTitle()),
                () -> assertThat(actualResponse.summary()).isEqualTo(project.getSummary()),
                () -> assertThat(actualResponse.description()).isEqualTo(project.getDescription()),
                () -> assertThat(actualResponse.techStacks())
                        .isEqualTo(project.getTechStacks().stream().map(TechStack::getName).toList()),
                () -> assertThat(actualResponse.organization()).isEqualTo(project.getOrganization().getName()),
                () -> assertThat(actualResponse.platforms())
                        .isEqualTo(project.getPlatforms().stream().map(Platform::getName).toList()),
                () -> assertThat(actualResponse.loves()).isEqualTo(0),
                () -> assertThat(actualResponse.views()).isEqualTo(1)
        );
    }

    @DisplayName("GET /projects : 모든 프로젝트 조회 API")
    @Test
    void getAllProjects() {
        // given
        String filteredSearch = "모아온";
        String unfilteredSearch = "모모온";
        Platform filteredPlatform = Fixture.anyPlatform();
        Platform unfilteredPlatform = Fixture.anyPlatform();
        Category filteredCategory = Fixture.anyCategory();
        Category unfilteredCategory = Fixture.anyCategory();
        Organization filteredOrganization = Fixture.anyOrganization();
        Organization unfilteredOrganization = Fixture.anyOrganization();
        TechStack filteredTechStack = Fixture.anyTechStack();
        TechStack unfilteredTechStack = Fixture.anyTechStack();

        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(unfilteredSearch)
                        .platforms(filteredPlatform)
                        .categories(filteredCategory)
                        .organization(filteredOrganization)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .platforms(unfilteredPlatform)
                        .categories(filteredCategory)
                        .organization(filteredOrganization)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .platforms(unfilteredPlatform)
                        .categories(unfilteredCategory)
                        .organization(filteredOrganization)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .platforms(unfilteredPlatform)
                        .categories(filteredCategory)
                        .organization(unfilteredOrganization)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .platforms(unfilteredPlatform)
                        .categories(filteredCategory)
                        .organization(filteredOrganization)
                        .techStacks(unfilteredTechStack)
                        .build()
        );

        Project projectViewRankThird = repositoryHelper.save(new ProjectFixtureBuilder()
                .description(filteredSearch)
                .platforms(filteredPlatform)
                .categories(filteredCategory)
                .organization(filteredOrganization)
                .techStacks(filteredTechStack)
                .views(1)
                .build()
        );
        Project projectViewRankSecond = repositoryHelper.save(new ProjectFixtureBuilder()
                .summary(filteredSearch)
                .platforms(filteredPlatform)
                .categories(filteredCategory)
                .organization(filteredOrganization)
                .techStacks(filteredTechStack)
                .views(2)
                .build()
        );
        Project projectViewRankFirst = repositoryHelper.save(new ProjectFixtureBuilder()
                .title(filteredSearch)
                .platforms(filteredPlatform)
                .categories(filteredCategory)
                .organization(filteredOrganization)
                .techStacks(filteredTechStack)
                .views(3)
                .build()
        );

        // when
        ProjectSummaryResponse[] actualResponses = RestAssured.given().log().all()
                .queryParams("search", filteredSearch)
                .queryParams("sort", "views")
                .queryParams("platforms", List.of(filteredPlatform.getName()))
                .queryParams("categories", List.of(filteredCategory.getName()))
                .queryParams("organizations", List.of(filteredOrganization.getName()))
                .queryParams("techStacks", List.of(filteredTechStack.getName()))
                .when().get("/projects")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectSummaryResponse[].class);

        // then
        assertAll(
                () -> assertThat(actualResponses).hasSize(3),
                () -> assertThat(actualResponses[0].id()).isEqualTo(projectViewRankFirst.getId()),
                () -> assertThat(actualResponses[1].id()).isEqualTo(projectViewRankSecond.getId()),
                () -> assertThat(actualResponses[2].id()).isEqualTo(projectViewRankThird.getId())
        );
    }
}
