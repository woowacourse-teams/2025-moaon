package moaon.backend.project.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.RepositoryTestHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({RepositoryTestHelper.class, QueryDslConfig.class})
class CustomizedProjectRepositoryImplTest {

    @Autowired
    private CustomizedProjectRepositoryImpl customizedProjectRepositoryImpl;

    @Autowired
    private RepositoryTestHelper repositoryTestHelper;

    @DisplayName("조건 없이 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearchConditions() {
        // given
        repositoryTestHelper.saveAnyProject();
        repositoryTestHelper.saveAnyProject();
        repositoryTestHelper.saveAnyProject();

        ProjectQueryCondition projectQueryCondition = new ProjectQueryCondition(null, null, null, null, null);

        //when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(projectQueryCondition);

        //then
        assertThat(projects.size()).isEqualTo(3);
    }

    @DisplayName("검색어로 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearch() {
        // given
        Project moaon = repositoryTestHelper.saveProjectWithSearchConditions(
                "모아온",
                "여러 플랫폼에 흩어진 포트폴리오를 한 곳에 정리할 수 있는 서비스입니다.",
                "GitHub, Notion, Velog 등 다양한 출처의 링크들을 카드 형태로 시각화하여 보여줍니다."
        );

        Project share = repositoryTestHelper.saveProjectWithSearchConditions(
                "공유공유",
                "개발자와 디자이너의 작업물을 쉽게 공유하고 검색할 수 있도록 도와줍니다.",
                "사용자 맞춤 검색 기능과 태그 필터링을 통해 필요한 작업물을 빠르게 찾을 수 있습니다."
        );

        Project hub = repositoryTestHelper.saveProjectWithSearchConditions(
                "허브허브",
                "링크 하나로 모든 프로젝트를 소개할 수 있는 포트폴리오 허브 플랫폼입니다.",
                "SNS 공유 최적화 및 모바일 반응형 UI를 제공하여 접근성과 확장성을 높였습니다."
        );

        // when
        List<Project> projects1 = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition("모아온", null, null, null, null));
        List<Project> projects2 = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition("개발자", null, null, null, null));
        List<Project> projects3 = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition("SNS", null, null, null, null));

        // then
        assertAll(
                () -> assertThat(projects1).containsOnly(moaon),
                () -> assertThat(projects2).containsOnly(share),
                () -> assertThat(projects3).containsOnly(hub)
        );
    }

    @DisplayName("조직 필터를 이용해 프로젝트를 조회한다.")
    @Test
    void findWithOrganizationFilter() {
        // given
        Organization organization1 = Fixture.anyOrganization();
        Organization organization2 = Fixture.anyOrganization();
        Organization organization3 = Fixture.anyOrganization();
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                organization1,
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(Fixture.anyPlatform())
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                organization2,
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(Fixture.anyPlatform())
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                organization3,
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(Fixture.anyPlatform())
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(
                        null,
                        null,
                        null,
                        List.of(organization1.getName(), organization2.getName()),
                        null
                )
        );

        // then
        assertAll(
                () -> assertThat(projects).hasSize(2),
                () -> assertThat(projects).contains(project1, project2)
        );
    }

    @DisplayName("카테고리 필터를 이용해 프로젝트를 조회한다.")
    @Test
    void findWithCategoryFilter() {
        // given
        Category category1 = Fixture.anyCategory();
        Category category2 = Fixture.anyCategory();
        Category category3 = Fixture.anyCategory();
        Category category4 = Fixture.anyCategory();
        Category category5 = Fixture.anyCategory();
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(category1, category2),
                List.of(Fixture.anyPlatform())
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(category2, category3),
                List.of(Fixture.anyPlatform())
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(category4, category5),
                List.of(Fixture.anyPlatform())
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(
                        null,
                        null,
                        List.of(category4.getName()),
                        null,
                        null
                )
        );

        // then
        assertAll(
                () -> assertThat(projects).containsOnly(project3)
        );
    }

    @DisplayName("기술스택 필터를 이용해 프로젝트를 조회한다.")
    @Test
    void findWithTechStackFilter() {
        // given
        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();
        TechStack techStack3 = Fixture.anyTechStack();
        TechStack techStack4 = Fixture.anyTechStack();
        TechStack techStack5 = Fixture.anyTechStack();
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(techStack1, techStack2),
                List.of(Fixture.anyCategory()),
                List.of(Fixture.anyPlatform())
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(techStack1, techStack3, techStack4),
                List.of(Fixture.anyCategory()),
                List.of(Fixture.anyPlatform())
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(techStack3, techStack4, techStack5),
                List.of(Fixture.anyCategory()),
                List.of(Fixture.anyPlatform())
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(
                        null,
                        null,
                        null,
                        null,
                        List.of(techStack3.getName(), techStack4.getName())
                )
        );

        // then
        assertAll(
                () -> assertThat(projects).hasSize(2),
                () -> assertThat(projects).contains(project3, project2)
        );
    }

    @DisplayName("플랫폼 필터를 이용해 프로젝트를 조회한다.")
    @Test
    void findWithPlatformFilter() {
        // given
        Platform platform1 = Fixture.anyPlatform();
        Platform platform2 = Fixture.anyPlatform();
        Platform platform3 = Fixture.anyPlatform();
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(platform1)
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(platform1)
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(platform2)
        );
        Project project4 = repositoryTestHelper.saveProjectWithFilterConditions(
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(platform2, platform3)
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(
                        null,
                        List.of(platform2.getName(), platform3.getName()),
                        null,
                        null,
                        null)
        );

        // then
        assertAll(
                () -> assertThat(projects).hasSize(2),
                () -> assertThat(projects).contains(project3, project4)
        );
    }
}
