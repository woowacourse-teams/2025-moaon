package moaon.backend.api.project;

import io.restassured.RestAssured;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("GET /projects/{id} : 프로젝트 단건 조회 API")
    @Test
    void findProject() {
        // given
//        Project project1 = projectRepository.save(new Project("제목", "썸네일", "설명"));
//        Project project2 = projectRepository.save(new Project("제목", "썸네일", "설명"));

        // when
        ProjectDetailResponse actualResponse = RestAssured.given().log().all()
                .when().get("/projects/1")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectDetailResponse.class);

        // then
//        assertAll(
//                () -> assertThat(actualResponses).hasSize(2),
//                () -> assertThat(actualResponses[0]).isEqualTo(ProjectSummaryResponse.from(project1)),
//                () -> assertThat(actualResponses[1]).isEqualTo(ProjectSummaryResponse.from(project2))
//        );
    }
}
