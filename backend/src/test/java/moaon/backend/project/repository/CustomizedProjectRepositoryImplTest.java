package moaon.backend.project.repository;

import static moaon.backend.fixture.ConstantFixture.CATEGORY1;
import static moaon.backend.fixture.ConstantFixture.CATEGORY2;
import static moaon.backend.fixture.ConstantFixture.CATEGORY3;
import static moaon.backend.fixture.ConstantFixture.CATEGORY4;
import static moaon.backend.fixture.ConstantFixture.CATEGORY5;
import static moaon.backend.fixture.ConstantFixture.ORGANIZATION1;
import static moaon.backend.fixture.ConstantFixture.ORGANIZATION2;
import static moaon.backend.fixture.ConstantFixture.ORGANIZATION3;
import static moaon.backend.fixture.ConstantFixture.PLATFORM1;
import static moaon.backend.fixture.ConstantFixture.PLATFORM2;
import static moaon.backend.fixture.ConstantFixture.PLATFORM3;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK1;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK2;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK3;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK4;
import static moaon.backend.fixture.ConstantFixture.TECH_STACK5;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import moaon.backend.fixture.RepositoryTestHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;
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
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1),
                List.of(CATEGORY1),
                List.of(PLATFORM1)
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION2,
                List.of(TECH_STACK1),
                List.of(CATEGORY1),
                List.of(PLATFORM1)
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION3,
                List.of(TECH_STACK1),
                List.of(CATEGORY1),
                List.of(PLATFORM1)
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(null, null, null, List.of(ORGANIZATION1, ORGANIZATION2), null));

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
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1),
                List.of(CATEGORY1, CATEGORY2),
                List.of(PLATFORM1)
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1),
                List.of(CATEGORY2, CATEGORY3),
                List.of(PLATFORM1)
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1),
                List.of(CATEGORY4, CATEGORY5),
                List.of(PLATFORM1)
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(null, null, List.of(CATEGORY4), null, null));

        // then
        assertAll(
                () -> assertThat(projects).containsOnly(project3)
        );
    }

    @DisplayName("기술스택 필터를 이용해 프로젝트를 조회한다.")
    @Test
    void findWithTechStackFilter() {
        // given
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1, TECH_STACK2),
                List.of(CATEGORY1),
                List.of(PLATFORM1)
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1, TECH_STACK3, TECH_STACK4),
                List.of(CATEGORY2),
                List.of(PLATFORM1)
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK3, TECH_STACK4, TECH_STACK5),
                List.of(CATEGORY1),
                List.of(PLATFORM1)
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(null, null, null, null, List.of(TECH_STACK3, TECH_STACK4)));

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
        Project project1 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1, TECH_STACK2),
                List.of(CATEGORY1),
                List.of(PLATFORM1)
        );
        Project project2 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK1, TECH_STACK3, TECH_STACK4),
                List.of(CATEGORY2),
                List.of(PLATFORM1)
        );
        Project project3 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK3, TECH_STACK4, TECH_STACK5),
                List.of(CATEGORY1),
                List.of(PLATFORM2)
        );
        Project project4 = repositoryTestHelper.saveProjectWithFilterConditions(
                ORGANIZATION1,
                List.of(TECH_STACK3, TECH_STACK4, TECH_STACK5),
                List.of(CATEGORY1),
                List.of(PLATFORM2, PLATFORM3)
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(null, List.of(PLATFORM2, PLATFORM3), null, null, null));

        // then
        assertAll(
                () -> assertThat(projects).hasSize(2),
                () -> assertThat(projects).contains(project3, project4)
        );
    }
}
