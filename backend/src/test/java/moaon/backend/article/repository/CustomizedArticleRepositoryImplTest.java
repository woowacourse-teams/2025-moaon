package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.article.dao.ArticleDao;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Articles;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectArticleQueryConditionFixtureBuilder;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.global.cursor.ClickArticleCursor;
import moaon.backend.global.cursor.CreatedAtArticleCursor;
import moaon.backend.project.dao.ProjectDao;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({RepositoryHelper.class, QueryDslConfig.class, ArticleDao.class, ProjectDao.class})
class CustomizedArticleRepositoryImplTest {

    @Autowired
    private CustomizedArticleRepositoryImpl customizedArticleRepository;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @Autowired
    private CustomizedArticleRepositoryImpl customizedArticleRepositoryImpl;

    @DisplayName("직군 필터를 이용하여 아티클을 조회한다.")
    @Test
    void findWithCategoryFilter() {
        // given
        Sector filterdSector = Sector.BE;
        Sector unFilterdSector = Sector.FE;

        Article articleWithCategory = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .sector(filterdSector)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .sector(unFilterdSector)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT)
                .sector(filterdSector)
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsOnlyOnce(articleWithCategory);
    }

    @DisplayName("기술스택 필터를 이용하여 아티클을 조회한다.")
    @Test
    void findWithTechStackFilter() {
        // given
        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();

        Article articleWithTechStacks = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(techStack1, techStack2)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(techStack2)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT)
                .techStackNames(techStack1.getName(), techStack2.getName())
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsOnlyOnce(articleWithTechStacks);
    }

    @DisplayName("주제 필터를 이용하여 아티클을 조회한다.")
    @Test
    void findWithTopicsFilter() {
        // given
        Topic topic = Topic.TECHNOLOGY_ADOPTION;

        Article articleWithTopic = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .topics(topic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .topics(Topic.PERFORMANCE_OPTIMIZATION)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT)
                .topics(topic)
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsOnlyOnce(articleWithTopic);
    }

    @DisplayName("직군, 주제, 기술스택 필터를 이용하여 아티클을 조회한다.")
    @Test
    void findWithTechStackAndCategoryFilter() {
        // given
        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();
        Topic topic = Topic.TECHNOLOGY_ADOPTION;
        Sector sector = Fixture.randomSector();

        Article articleWithTechStacksAndCategoryAndTopic = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(techStack1, techStack2)
                        .sector(sector)
                        .topics(topic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(techStack1, techStack2)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .sector(sector)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .topics(topic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT)
                .sector(sector)
                .topics(topic)
                .techStackNames(List.of(techStack1.getName(), techStack2.getName()))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsOnlyOnce(articleWithTechStacksAndCategoryAndTopic);
    }

    @DisplayName("필터 조건이 없으면 모든 아티클을 반환한다.")
    @Test
    void findWithNoFilter() {
        // given
        Article article1 = repositoryHelper.save(new ArticleFixtureBuilder().build());
        Article article2 = repositoryHelper.save(new ArticleFixtureBuilder().build());
        Article article3 = repositoryHelper.save(new ArticleFixtureBuilder().build());

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT).build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsExactlyInAnyOrder(article1, article2, article3);
    }

    @DisplayName("필터 조건에 해당하는 결과가 없으면 빈 결과값을 반환한다.")
    @Test
    void findWithEmptyResult() {
        // given
        Sector existingSector = Sector.BE;
        Sector nonExistingSector = Sector.FE;

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .sector(existingSector)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT)
                .sector(nonExistingSector)
                .build();

        // when
        Articles articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertAll(
                () -> assertThat(articles.getTotalCount()).isZero(),
                () -> assertThat(articles.getArticles()).isEmpty()
        );
    }

    @DisplayName("아티클을 생성일자를 기준으로 정렬한다.")
    @Test
    void toOrderByCreatedAt() {
        // given
        LocalDateTime today = LocalDateTime.of(2024, 7, 29, 0, 0);
        LocalDateTime tomorrow = today.plusDays(1);
        LocalDateTime yesterday = today.minusDays(1);

        Article todayArticle = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .createdAt(today)
                        .build()
        );

        Article yesterdayArticle = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .createdAt(yesterday)
                        .build()
        );

        Article tomorrowArticle = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .createdAt(tomorrow)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .createdAt(LocalDateTime.of(2024, 7, 31, 10, 0, 0))
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT)
                .cursor(new CreatedAtArticleCursor(LocalDateTime.of(2024, 7, 31, 10, 0), 1L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsExactly(tomorrowArticle, todayArticle, yesterdayArticle);
    }

    @DisplayName("아티클을 클릭수 기준으로 정렬한다.")
    @Test
    void toOrderByClicks() {
        // given
        Article highClicks = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        Article middleClicks = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(2)
                        .build()
        );

        Article lowClicks = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(1)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(5)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(4)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CLICKS)
                .cursor(new ClickArticleCursor(4, 4L))
                .build();

        // when
        List<Article> articles = customizedArticleRepositoryImpl.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsExactly(highClicks, middleClicks, lowClicks);
    }

    @DisplayName("마지막 페이지가 아닐 시 limit + 1개 만큼 가져온다.")
    @Test
    void findArticlesForLimitPlusOne() {
        // given
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(4, ArticleSortType.CLICKS).build();

        // when
        Articles articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertAll(
                () -> assertThat(articles.getLimit()).isEqualTo(4),
                () -> assertThat(articles.getArticles()).hasSize(5),
                () -> assertThat(articles.hasNext()).isTrue()
        );
    }

    @DisplayName("마지막 페이지 도달하면 limit 개수 이하로 가져온다.")
    @Test
    void findArticlesForUnderLimit() {
        // given
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        repositoryHelper.save(new ArticleFixtureBuilder().build());

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(9, ArticleSortType.CLICKS).build();

        // when
        Articles articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertAll(
                () -> assertThat(articles.getLimit()).isEqualTo(9),
                () -> assertThat(articles.getArticles()).hasSize(6),
                () -> assertThat(articles.getTotalCount()).isEqualTo(6),
                () -> assertThat(articles.hasNext()).isFalse()
        );
    }

    @DisplayName("cursor 가 없는 경우 초기 데이터를 가져온다.")
    @Test
    void findArticlesWithNoCursor() {
        // given
        Article articleWithId1 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        Article articleWithId2 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(2)
                        .build()
        );

        Article articleWithId3 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(1)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(9, ArticleSortType.CLICKS)
                .cursor(new CreatedAtArticleCursor(LocalDateTime.now(), 1L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsExactly(articleWithId1, articleWithId2, articleWithId3);
    }

    @DisplayName("필터링을 거친 아티클의 개수를 확인하여 반환한다.")
    @Test
    void findWithSearchCondition() {
        // given
        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();

        Article wantToFind1 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(List.of(techStack1, techStack2))
                        .createdAt(LocalDateTime.of(2024, 7, 30, 0, 0))
                        .build()
        );

        Article wantToFind2 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(List.of(techStack1, techStack2))
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder(10, ArticleSortType.CREATED_AT)
                .techStackNames(techStack1.getName(), techStack2.getName())
                .build();

        // when
        long count = customizedArticleRepository.findWithSearchConditions(queryCondition).getTotalCount();

        // then
        assertThat(count).isEqualTo(2);
    }

    @DisplayName("상세페이지에서 직군 필터를 이용하여 아티클을 조회한다.")
    @Test
    void getByProjectIdAndSector() {
        // given
        Project project = repositoryHelper.save(new ProjectFixtureBuilder().build());
        Sector filteredSector = Sector.BE;
        Sector unFilterdSector = Sector.FE;

        Article filterArticle1 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(project)
                        .sector(filteredSector)
                        .build()
        );

        Article filterArticle2 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(project)
                        .sector(filteredSector)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(project)
                        .sector(unFilterdSector)
                        .build()
        );

        // when
        ProjectArticleQueryCondition condition = new ProjectArticleQueryConditionFixtureBuilder()
                .sector(filteredSector)
                .build();
        List<Article> articles = customizedArticleRepository.findAllByProjectIdAndCondition(project.getId(), condition);

        // then
        assertThat(articles).containsExactlyInAnyOrder(filterArticle1, filterArticle2);
    }
}
