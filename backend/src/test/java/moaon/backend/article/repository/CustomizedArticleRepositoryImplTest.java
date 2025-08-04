package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCategory;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.fixture.ArticleFixtureBuilder;
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

        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                null,
                filterdArticleCategory.getName(),
                List.of(),
                "createdAt",
                10,
                "2024-07-31T10:00:00_0"
        );

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

        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                null,
                null,
                List.of(techStack1.getName(), techStack2.getName()),
                "createdAt",
                10,
                "2024-07-31T10:00:00_1"
        );

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

        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                null,
                articleCategory.getName(),
                List.of(techStack1.getName(), techStack2.getName()),
                "createdAt",
                10,
                "2024-07-31T10:00:00_1"
        );

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

        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                null,
                null,
                null,
                "createdAt",
                10,
                "2024-07-31T10:00:00_1"
        );

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

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

        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                null,
                null,
                null,
                "clicks",
                10,
                "4_4"
        );

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

        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                null,
                null,
                null,
                "clicks",
                4,
                "4_9999999"
        );

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

        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                null,
                null,
                null,
                "clicks",
                9,
                "4_9999999"
        );

        // when
        List<Article> articles = customizedArticleRepository.findWithSearchConditions(queryCondition);

        // then
        assertThat(articles).hasSize(6);
    }
}
