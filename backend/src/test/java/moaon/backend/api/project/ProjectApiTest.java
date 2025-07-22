package moaon.backend.api.project;

import static moaon.backend.fixture.ConstantFixture.CATEGORY1;
import static moaon.backend.fixture.ConstantFixture.CATEGORY2;
import static moaon.backend.fixture.ConstantFixture.ORGANIZATION1;
import static moaon.backend.fixture.ConstantFixture.ORGANIZATION2;
import static moaon.backend.fixture.ConstantFixture.PLATFORM1;
import static moaon.backend.fixture.ConstantFixture.PLATFORM2;
import static moaon.backend.fixture.ConstantFixture.PLATFORM3;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK1;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK2;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK3;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK4;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import java.util.List;
import moaon.backend.fixture.RepositoryTestHelper;
import moaon.backend.global.config.QueryDslConfig;
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
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1, TECH_STACK2, TECH_STACK3, TECH_STACK4),
                List.of(CATEGORY1),
                List.of(PLATFORM1)
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1, TECH_STACK2, TECH_STACK3, TECH_STACK4),
                List.of(CATEGORY1, CATEGORY2),
                List.of(PLATFORM3)
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK3, TECH_STACK4),
                List.of(CATEGORY1, CATEGORY2),
                List.of(PLATFORM2)
        );
        Project project4 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1, TECH_STACK2, TECH_STACK3, TECH_STACK4),
                List.of(CATEGORY1),
                List.of(PLATFORM2)
        );

        // when
        ProjectSummaryResponse[] actualResponses = RestAssured.given().log().all()
                .queryParams("platforms", List.of(PLATFORM1.getName(), PLATFORM2.getName()))
                .queryParams("categories", List.of(CATEGORY1.getName(), CATEGORY2.getName()))
                .queryParams("organizations", List.of(ORGANIZATION1.getName(), ORGANIZATION2.getName()))
                .queryParams("techStacks", List.of(TECH_STACK1.getName(), TECH_STACK2.getName()))
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
