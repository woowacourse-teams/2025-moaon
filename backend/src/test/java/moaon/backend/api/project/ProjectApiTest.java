package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.RepositoryTestHelper;
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
@Import({RepositoryTestHelper.class, QueryDslConfig.class})
public class ProjectApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    private RepositoryTestHelper repositoryTestHelper;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("GET /projects/{id} : 프로젝트 단건 조회 API")
    @Test
    void findProject() {
        // given
        Project project = repositoryTestHelper.saveAnyProject();

        // when
        ProjectDetailResponse actualResponse = RestAssured.given().log().all()
                .when().get("/projects/1")
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
        Project project1 = repositoryTestHelper.saveAnyProject();
        Project project2 = repositoryTestHelper.saveAnyProject();
        Project project3 = repositoryTestHelper.saveAnyProject();

        // when
        ProjectSummaryResponse[] actualResponses = RestAssured.given().log().all()
                .when().get("/projects")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectSummaryResponse[].class);

        // then
        assertAll(
                () -> assertThat(actualResponses).hasSize(3),
                () -> assertThat(actualResponses[0]).isEqualTo(ProjectSummaryResponse.from(project1, 0)),
                () -> assertThat(actualResponses[1]).isEqualTo(ProjectSummaryResponse.from(project2, 0)),
                () -> assertThat(actualResponses[2]).isEqualTo(ProjectSummaryResponse.from(project3, 0))
        );
    }

    @DisplayName("GET /projects : 모든 프로젝트 조회 API + 필터")
    @Test
    void getAllProjects2() {
        // given
        Organization organization1 = Fixture.anyOrganization();
        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();
        TechStack techStack3 = Fixture.anyTechStack();
        TechStack techStack4 = Fixture.anyTechStack();
        Category category1 = Fixture.anyCategory();
        Category category2 = Fixture.anyCategory();
        Platform platform1 = Fixture.anyPlatform();
        Platform platform2 = Fixture.anyPlatform();
        Platform platform3 = Fixture.anyPlatform();

        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                organization1,
                List.of(techStack1, techStack2, techStack3, techStack4),
                List.of(category1),
                List.of(platform1)
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                organization1,
                List.of(techStack1, techStack2, techStack3, techStack4),
                List.of(category1, category2),
                List.of(platform3)
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                organization1,
                List.of(techStack3, techStack4),
                List.of(category1, category2),
                List.of(platform2)
        );
        Project project4 = repositoryTestHelper.saveProjectWithFilterConditions(
                organization1,
                List.of(techStack1, techStack2, techStack3, techStack4),
                List.of(category1),
                List.of(platform2)
        );

        // when
        ProjectSummaryResponse[] actualResponses = RestAssured.given().log().all()
                .queryParams("platforms", List.of(platform1.getName(), platform2.getName()))
                .queryParams("categories", List.of(category1.getName(), category2.getName()))
                .queryParams("organizations", List.of(organization1.getName()))
                .queryParams("techStacks", List.of(techStack1.getName(), techStack2.getName()))
                .when().get("/projects")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectSummaryResponse[].class);

        // then
        assertAll(
                () -> assertThat(actualResponses[0].id()).isEqualTo(project1.getId()),
                () -> assertThat(actualResponses[1].id()).isEqualTo(project4.getId())
        );
    }
}
