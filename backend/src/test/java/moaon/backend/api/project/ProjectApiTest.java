package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.category.repository.CategoryRepository;
import moaon.backend.fixture.RepositoryTestHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.love.domain.Love;
import moaon.backend.love.repository.LoveRepository;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import moaon.backend.organization.domain.Organization;
import moaon.backend.organization.repository.OrganizationRepository;
import moaon.backend.platform.domain.Platform;
import moaon.backend.platform.repository.PlatformRepository;
import moaon.backend.project.domain.Images;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectSummaryResponse;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.domain.TechStack;
import moaon.backend.techStack.repository.TechStackRepository;
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
    private ProjectRepository projectRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TechStackRepository techStackRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PlatformRepository platformRepository;

    @Autowired
    private LoveRepository loveRepository;

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
        Organization organization = organizationRepository.save(new Organization("그룹명"));
        Member member = memberRepository.save(new Member("글쓴이"));
        TechStack techStack1 = techStackRepository.save(new TechStack("java"));
        TechStack techStack2 = techStackRepository.save(new TechStack("javaScript"));
        TechStack techStack3 = techStackRepository.save(new TechStack("springBoot"));
        TechStack techStack4 = techStackRepository.save(new TechStack("mysql"));
        Category category1 = categoryRepository.save(new Category("sports"));
        Category category2 = categoryRepository.save(new Category("book"));
        Platform platform = platformRepository.save(new Platform("web"));
        Project project = projectRepository.save(new Project(
                "제목",
                "한 줄 소개",
                "상세 설명",
                "깃허브 URL",
                "프로덕션 URL",
                new Images(List.of("이미지 URL1", "이미지 URL2")),
                organization,
                member,
                List.of(techStack1, techStack2, techStack3, techStack4),
                List.of(category1, category2),
                List.of(platform),
                LocalDateTime.now()
        ));
        loveRepository.save(new Love(project, member));

        // when
        ProjectDetailResponse actualResponse = RestAssured.given().log().all()
                .when().get("/projects/1")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectDetailResponse.class);

        // then
        assertAll(
                () -> assertThat(actualResponse.title()).isEqualTo("제목"),
                () -> assertThat(actualResponse.summary()).isEqualTo("한 줄 소개"),
                () -> assertThat(actualResponse.description()).isEqualTo("상세 설명"),
                () -> assertThat(actualResponse.techStacks()).contains("java", "javaScript", "springBoot", "mysql"),
                () -> assertThat(actualResponse.organization()).isEqualTo("그룹명"),
                () -> assertThat(actualResponse.platforms()).contains("web"),
                () -> assertThat(actualResponse.loves()).isEqualTo(1),
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
}
