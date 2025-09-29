package moaon.backend.project.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.ProjectQueryConditionFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.member.domain.Member;
import moaon.backend.project.dao.ProjectDao;
import moaon.backend.project.domain.Category;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectSortType;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@Import({RepositoryHelper.class, QueryDslConfig.class, ProjectDao.class})
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
        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(projectQueryCondition);

        //then
        assertThat(projects.getCount()).isEqualTo(3);
    }

    @DisplayName("카테고리 필터를 이용해 프로젝트를 조회한다.")
    @Test
    void findWithCategoryFilter() {
        // given
        Category category1 = Fixture.anyProjectCategory();
        Category category2 = Fixture.anyProjectCategory();
        Category category3 = Fixture.anyProjectCategory();
        Category category4 = Fixture.anyProjectCategory();
        Category category5 = Fixture.anyProjectCategory();

        repositoryHelper.save(new ProjectFixtureBuilder()
                .categories(category1, category2)
                .build()
        );
        repositoryHelper.save(new ProjectFixtureBuilder()
                .categories(category2, category3)
                .build()
        );
        Project projectWantToFind = repositoryHelper.save(new ProjectFixtureBuilder()
                .categories(category1, category3, category4, category5)
                .build()
        );

        // when
        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder()
                .categoryNames(
                        category1.getName(),
                        category3.getName(),
                        category4.getName(),
                        category5.getName())
                .build();

        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(projects.getProjects()).containsOnlyOnce(projectWantToFind);
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

        repositoryHelper.save(new ProjectFixtureBuilder()
                .techStacks(techStack3, techStack5)
                .build()
        );
        Project projectWantToFind = repositoryHelper.save(new ProjectFixtureBuilder()
                .techStacks(techStack1, techStack2, techStack3, techStack4)
                .build()
        );

        // when
        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder().
                techStackNames(
                        techStack1.getName(),
                        techStack2.getName(),
                        techStack3.getName(),
                        techStack4.getName())
                .build();

        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(projects.getProjects()).containsExactlyInAnyOrder(projectWantToFind);
    }

    @DisplayName("카테고리 기술스택 필터를 모두 이용하여 조회한다.")
    @Test
    void findWithTechStackFilterAndCategory() {
        // given
        Category category1 = Fixture.anyProjectCategory();
        Category category2 = Fixture.anyProjectCategory();
        Category category3 = Fixture.anyProjectCategory();

        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();

        Project wantToFindProject = repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .categories(category1, category2, category3)
                        .techStacks(techStack1, techStack2)
                        .build()
        );

        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .categories(category1, category2)
                        .techStacks(techStack1, techStack2)
                        .build()
        );

        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .categories(category1, category2, category3)
                        .techStacks(techStack1)
                        .build()
        );

        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder()
                .categoryNames(category1.getName(), category2.getName(), category3.getName())
                .techStackNames(techStack1.getName(), techStack2.getName())
                .build();

        // when
        Projects actual = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(actual.getProjects()).containsOnlyOnce(wantToFindProject);
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
        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder()
                .sortBy(ProjectSortType.VIEWS)
                .build();

        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(projects.getProjects()).containsExactly(high, middle, low);
    }

    @DisplayName("프로젝트의 아티클 갯수를 기준으로 정렬한다.")
    @Test
    void toOrderByArticleCount() {
        // given
        Project low = repositoryHelper.save(new ProjectFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().project(low).build());

        Project middle = repositoryHelper.save(new ProjectFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().project(middle).build());
        repositoryHelper.save(new ArticleFixtureBuilder().project(middle).build());

        Project high = repositoryHelper.save(new ProjectFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().project(high).build());
        repositoryHelper.save(new ArticleFixtureBuilder().project(high).build());
        repositoryHelper.save(new ArticleFixtureBuilder().project(high).build());

        // when
        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder()
                .sortBy(ProjectSortType.ARTICLE_COUNT)
                .build();

        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(projects.getProjects()).containsExactly(high, middle, low);
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
        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder()
                .sortBy(ProjectSortType.CREATED_AT)
                .build();

        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(projects.getProjects()).containsExactly(tomorrowProject, todayProject, yesterdayProject);
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
        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder()
                .sortBy(ProjectSortType.LOVES)
                .build();

        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(projects.getProjects()).containsExactly(high, middle, low);
    }

    @DisplayName("필터링을 거친 프로젝트의 개수를 가져온다.")
    @Test
    void countWithSearchCondition() {
        // given
        Category category1 = Fixture.anyProjectCategory();
        Category category2 = Fixture.anyProjectCategory();
        Category category3 = Fixture.anyProjectCategory();

        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();

        Project wantToFindProject1 = repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .categories(category1, category2, category3)
                        .techStacks(techStack1, techStack2)
                        .build()
        );

        Project wantToFindProject2 = repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .categories(category1, category2, category3)
                        .techStacks(techStack1, techStack2)
                        .build()
        );

        Project wantToFindProject3 = repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .categories(category1, category2, category3)
                        .techStacks(techStack1, techStack2)
                        .build()
        );

        ProjectQueryCondition queryCondition = new ProjectQueryConditionFixtureBuilder()
                .categoryNames(category1.getName(), category2.getName(), category3.getName())
                .techStackNames(techStack1.getName(), techStack2.getName())
                .build();

        // when
        Projects projects = customizedProjectRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(projects.getCount()).isEqualTo(3);
    }
}
