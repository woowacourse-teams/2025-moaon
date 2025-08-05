package moaon.backend.project.repository;

import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.ProjectQueryConditionFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.member.domain.Member;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.project.domain.SortBy;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DataJpaTest
@Import({RepositoryHelper.class, QueryDslConfig.class})
class CustomizedProjectRepositoryImplTest {

    @Autowired
    private CustomizedProjectRepositoryImpl customizedProjectRepositoryImpl;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @DisplayName("조건 없이 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearchConditions() {
        // given
        repositoryHelper.save(new ProjectFixtureBuilder().build());
        repositoryHelper.save(new ProjectFixtureBuilder().build());
        repositoryHelper.save(new ProjectFixtureBuilder().build());

        ProjectQueryCondition projectQueryCondition = new ProjectQueryConditionFixtureBuilder().build();

        //when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(projectQueryCondition);

        //then
        assertThat(projects.size()).isEqualTo(3);
    }

    @DisplayName("검색어로 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearch() {
        // given
        Project moaon = repositoryHelper.save(new ProjectFixtureBuilder()
                .title("모아온")
                .summary("여러 플랫폼에 흩어진 포트폴리오를 한 곳에 정리할 수 있는 서비스입니다.")
                .description("GitHub, Notion, Velog 등 다양한 출처의 링크들을 카드 형태로 시각화하여 보여줍니다.")
                .build()
        );
        Project share = repositoryHelper.save(new ProjectFixtureBuilder()
                .title("공유공유")
                .summary("개발자와 디자이너의 작업물을 쉽게 공유하고 검색할 수 있도록 도와줍니다.")
                .description("사용자 맞춤 검색 기능과 태그 필터링을 통해 필요한 작업물을 빠르게 찾을 수 있습니다.")
                .build()
        );
        Project hub = repositoryHelper.save(new ProjectFixtureBuilder()
                .title("허브허브")
                .summary("링크 하나로 모든 프로젝트를 소개할 수 있는 포트폴리오 허브 플랫폼입니다.")
                .description("SNS 공유 최적화 및 모바일 반응형 UI를 제공하여 접근성과 확장성을 높였습니다.")
                .build()
        );

        // when
        List<Project> projectsWithMoaon = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder()
                        .search("모아온")
                        .build()
        );
        List<Project> projectsWithShare = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder()
                        .search("개발자")
                        .build()
        );
        List<Project> projectsWithHub = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder()
                        .search("SNS")
                        .build()
        );

        // then
        assertAll(
                () -> assertThat(projectsWithMoaon).containsOnlyOnce(moaon),
                () -> assertThat(projectsWithShare).containsOnlyOnce(share),
                () -> assertThat(projectsWithHub).containsOnlyOnce(hub)
        );
    }

    @DisplayName("카테고리 필터를 이용해 프로젝트를 조회한다.")
    @Test
    void findWithCategoryFilter() {
        // given
        ProjectCategory projectCategory1 = Fixture.anyProjectCategory();
        ProjectCategory projectCategory2 = Fixture.anyProjectCategory();
        ProjectCategory projectCategory3 = Fixture.anyProjectCategory();
        ProjectCategory projectCategory4 = Fixture.anyProjectCategory();
        ProjectCategory projectCategory5 = Fixture.anyProjectCategory();

        repositoryHelper.save(new ProjectFixtureBuilder()
                .categories(projectCategory1, projectCategory2)
                .build()
        );
        repositoryHelper.save(new ProjectFixtureBuilder()
                .categories(projectCategory2, projectCategory3)
                .build()
        );
        Project projectWithCategory4 = repositoryHelper.save(new ProjectFixtureBuilder()
                .categories(projectCategory4, projectCategory5)
                .build()
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder()
                        .categoryNames(projectCategory4.getName())
                        .build()
        );

        // then
        assertThat(projects).containsOnlyOnce(projectWithCategory4);
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

        repositoryHelper.save(new ProjectFixtureBuilder()
                .techStacks(techStack1, techStack2)
                .build());

        Project projectWithTechStack3 = repositoryHelper.save(new ProjectFixtureBuilder()
                .techStacks(techStack3, techStack5)
                .build()
        );
        Project projectWithTechStack4 = repositoryHelper.save(new ProjectFixtureBuilder()
                .techStacks(techStack1, techStack4)
                .build()
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder().
                        techStackNames(techStack3.getName(), techStack4.getName())
                        .build()
        );

        // then
        assertThat(projects).containsExactlyInAnyOrder(projectWithTechStack3, projectWithTechStack4);
    }

    @DisplayName("프로젝트를 조회순을 기준으로 정렬한다.")
    @Test
    void toOrderByViews() {
        // given
        Project high = repositoryHelper.save(new ProjectFixtureBuilder()
                .views(3)
                .build()
        );
        Project middle = repositoryHelper.save(new ProjectFixtureBuilder()
                .views(2)
                .build()
        );
        Project low = repositoryHelper.save(new ProjectFixtureBuilder().build());

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder()
                        .sortBy(SortBy.VIEWS)
                        .build()
        );

        // then
        assertThat(projects).containsExactly(high, middle, low);
    }

    @DisplayName("프로젝트를 생성일자 기준으로 정렬한다.")
    @Test
    void toOrderByCreatedAt() {
        // given
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime tomorrow = today.plusDays(1);
        LocalDateTime yesterday = today.minusDays(1);
        Project todayProject = repositoryHelper.save(new ProjectFixtureBuilder()
                .createdAt(today)
                .build()
        );
        Project tomorrowProject = repositoryHelper.save(new ProjectFixtureBuilder()
                .createdAt(tomorrow)
                .build()
        );
        Project yesterdayProject = repositoryHelper.save(new ProjectFixtureBuilder()
                .createdAt(yesterday)
                .build()
        );

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder()
                        .sortBy(SortBy.CREATED_AT)
                        .build()
        );

        // then
        assertThat(projects).containsExactly(tomorrowProject, todayProject, yesterdayProject);
    }

    @DisplayName("프로젝트를 좋아요 순으로 정렬한다.")
    @Test
    void toOrderByLove() {
        // given
        Project low = repositoryHelper.save(new ProjectFixtureBuilder().build());
        Project middle = repositoryHelper.save(new ProjectFixtureBuilder().build());
        Project high = repositoryHelper.save(new ProjectFixtureBuilder().build());

        Member author1 = low.getAuthor();
        Member author2 = middle.getAuthor();

        high.addLovedMember(author1);
        high.addLovedMember(author2);

        middle.addLovedMember(author1);

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryConditionFixtureBuilder()
                        .sortBy(SortBy.LOVES)
                        .build()
        );

        // then
        assertThat(projects).containsExactly(high, middle, low);
    }
}
