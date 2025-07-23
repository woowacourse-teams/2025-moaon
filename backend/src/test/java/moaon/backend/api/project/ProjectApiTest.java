package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
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
        Project project = repositoryTestHelper.save(ProjectFixtureBuilder.anyProject().build());

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
    void getAllProjects2() {
        // given
        Organization organization1 = Fixture.anyOrganization();
        TechStack techStack1 = Fixture.anyTechStack();
        Category category1 = Fixture.anyCategory();
        Platform platform1 = Fixture.anyPlatform();
        Platform platform2 = Fixture.anyPlatform();

        repositoryTestHelper.save(
                ProjectFixtureBuilder.anyProject()
                        .description("모모온")
                        .platforms(platform1)
                        .categories(category1)
                        .organization(organization1)
                        .techStacks(techStack1)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
        repositoryTestHelper.save(
                ProjectFixtureBuilder.anyProject()
                        .description("모모온")
                        .platforms(platform2)
                        .categories(category1)
                        .organization(organization1)
                        .techStacks(techStack1)
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        Project projectViewCount1 = ProjectFixtureBuilder.anyProject()
                .description("모아온")
                .platforms(platform1)
                .categories(category1)
                .organization(organization1)
                .techStacks(techStack1)
                .createdAt(LocalDateTime.now())
                .build();
        projectViewCount1.addViewCount();
        Project projectViewRankThird = repositoryTestHelper.save(projectViewCount1);

        Project projectViewCount2 = ProjectFixtureBuilder.anyProject()
                .summary("모아온")
                .platforms(platform1)
                .categories(category1)
                .organization(organization1)
                .techStacks(techStack1)
                .createdAt(LocalDateTime.now().minusDays(1))
                .build();
        projectViewCount2.addViewCount();
        projectViewCount2.addViewCount();
        Project projectViewRankSecond = repositoryTestHelper.save(projectViewCount2);

        Project projectViewCount3 = ProjectFixtureBuilder.anyProject()
                .title("모아온")
                .platforms(platform1)
                .categories(category1)
                .organization(organization1)
                .techStacks(techStack1)
                .createdAt(LocalDateTime.now().minusDays(1))
                .build();
        projectViewCount3.addViewCount();
        projectViewCount3.addViewCount();
        projectViewCount3.addViewCount();
        Project projectViewRankFirst = repositoryTestHelper.save(projectViewCount3);

        // when
        ProjectSummaryResponse[] actualResponses = RestAssured.given().log().all()
                .queryParams("search", "모아온")
                .queryParams("sort", "views")
                .queryParams("platforms", List.of(platform1.getName()))
                .queryParams("categories", List.of(category1.getName()))
                .queryParams("organizations", List.of(organization1.getName()))
                .queryParams("techStacks", List.of(techStack1.getName()))
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
