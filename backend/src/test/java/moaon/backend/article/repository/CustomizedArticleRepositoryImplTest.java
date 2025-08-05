package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCategory;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ClickCursor;
import moaon.backend.article.dto.CreatedAtCursor;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({RepositoryHelper.class, QueryDslConfig.class})
class CustomizedArticleRepositoryImplTest {

    @Autowired
    private CustomizedArticleRepositoryImpl customizedArticleRepository;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @Autowired
    private CustomizedArticleRepositoryImpl customizedArticleRepositoryImpl;

    @DisplayName("카테고리 필터를 이용하여 아티클을 조회한다.")
    @Test
    void findWithCategoryFilter() {
        // given
        ArticleCategory filterdArticleCategory = Fixture.anyArticleCategory();
        ArticleCategory unFilterdArticleCategory = Fixture.anyArticleCategory();

        Article articleWithCategory = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(filterdArticleCategory)
                        .createdAt(LocalDateTime.of(2024, 7, 30, 0, 0))
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .category(unFilterdArticleCategory)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .categoryName(filterdArticleCategory.getName())
                .sortBy(ArticleSortBy.CREATED_AT)
                .limit(10)
                .cursor(new CreatedAtCursor(LocalDateTime.of(2024, 7, 31, 10, 0), 1L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

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
                        .techStacks(List.of(techStack1, techStack2))
                        .createdAt(LocalDateTime.of(2024, 7, 30, 0, 0))
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(List.of(techStack2))
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .techStackNames(List.of(techStack1.getName(), techStack2.getName()))
                .sortBy(ArticleSortBy.CREATED_AT)
                .limit(10)
                .cursor(new CreatedAtCursor(LocalDateTime.of(2024, 7, 31, 10, 0), 1L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertThat(articles).containsOnlyOnce(articleWithTechStacks);
    }

    @DisplayName("카테고리, 기술스택 필터를 이용하여 아티클을 조회한다.")
    @Test
    void findWithTechStackAndCategoryFilter() {
        // given
        TechStack techStack1 = Fixture.anyTechStack();
        TechStack techStack2 = Fixture.anyTechStack();

        ArticleCategory articleCategory = Fixture.anyArticleCategory();

        Article articleWithTechStacksAndCategory = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(List.of(techStack1, techStack2))
                        .category(articleCategory)
                        .createdAt(LocalDateTime.of(2024, 7, 30, 0, 0))
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(List.of(techStack2))
                        .category(articleCategory)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .categoryName(articleCategory.getName())
                .techStackNames(List.of(techStack1.getName(), techStack2.getName()))
                .sortBy(ArticleSortBy.CREATED_AT)
                .limit(10)
                .cursor(new CreatedAtCursor(LocalDateTime.of(2024, 7, 31, 10, 0), 1L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertThat(articles).containsOnlyOnce(articleWithTechStacksAndCategory);
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

        ArticleQueryCondition queryCondition1 = new ArticleQueryConditionBuilder()
                .sortBy(ArticleSortBy.CREATED_AT)
                .limit(10)
                .cursor(new CreatedAtCursor(LocalDateTime.of(2024, 7, 31, 10, 0), 1L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition1);

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

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .sortBy(ArticleSortBy.CLICKS)
                .limit(10)
                .cursor(new ClickCursor(4, 4L))
                .build();

        // when
        List<Article> articles = customizedArticleRepositoryImpl.findWithSearchConditions(queryCondition);

        // then
        assertThat(articles).containsExactly(highClicks, middleClicks, lowClicks);
    }

    @DisplayName("마지막 페이지가 아닐 시 limit + 1개 만큼 가져온다.")
    @Test
    void findArticlesForLimitPlusOne() {
        // given
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .sortBy(ArticleSortBy.CLICKS)
                .limit(4)
                .cursor(new ClickCursor(4, 99999999L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertThat(articles).hasSize(5);
    }

    @DisplayName("마지막 페이지 도달하면 limit 개수 이하로 가져온다.")
    @Test
    void findArticlesForUnderLimit() {
        // given
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .clicks(3)
                        .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .sortBy(ArticleSortBy.CLICKS)
                .limit(9)
                .cursor(new ClickCursor(4, 999999L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertThat(articles).hasSize(6);
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

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .sortBy(ArticleSortBy.CLICKS)
                .limit(9)
                .cursor(new CreatedAtCursor(LocalDateTime.now(), 1L))
                .build();

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertThat(articles).containsExactly(articleWithId1, articleWithId2, articleWithId3);
    }
}
