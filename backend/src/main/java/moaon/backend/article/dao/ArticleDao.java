package moaon.backend.article.dao;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.techStack.domain.QArticleTechStack.articleTechStack;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.ArticleFullTextSearchHQLFunction;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class ArticleDao {

    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;
    private static final String BLANK = " ";

    private final JPAQueryFactory jpaQueryFactory;
    private final JdbcTemplate jdbcTemplate;

    public List<Article> findArticles(List<Long> articleIdsBySector, ArticleQueryCondition queryCondition) {
        return jpaQueryFactory
                .selectFrom(article)
                .where(
                        applyCursor(queryCondition.articleCursor()),
                        articleIdIn(articleIdsBySector)
                )
                .orderBy(toOrderBy(queryCondition.sortBy()))
                .limit(queryCondition.limit() + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    public List<Long> findArticleIdsByTechStackNames(List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return Collections.emptyList();
        }

        return jpaQueryFactory
                .select(articleTechStack.article.id)
                .from(articleTechStack)
                .join(articleTechStack.techStack, techStack)
                .where(techStack.name.in(techStackNames))
                .groupBy(articleTechStack.article.id)
                .having(techStack.name.count().eq((long) techStackNames.size()))
                .fetch();
    }

    public List<Long> findArticleIdsByTopics(List<Topic> topics) {
        if (CollectionUtils.isEmpty(topics)) {
            return Collections.emptyList();
        }

        String sql = """
                SELECT
                    article_id
                FROM
                    article_topics
                WHERE
                    topics in (:topics)
                GROUP BY
                    article_id
                HAVING
                    COUNT(article_id) = :topicCount;
                """;
        List<String> topicNames = topics.stream()
                .map(Topic::name)
                .toList();
        return jdbcTemplate.queryForList(sql, Long.class, topicNames, topics.size());
    }

    public List<Long> findArticleIdsBySearchKeyword(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return Collections.emptyList();
        }

        return jpaQueryFactory
                .select(article.id)
                .from(article)
                .where(satisfiesMatchScore(searchKeyword))
                .fetch();
    }

    public List<Long> findArticleIdsBySector(Sector sector, Set<Long> filteredIds) {
        if (sector == null && CollectionUtils.isEmpty(filteredIds)) {
            return Collections.emptyList();
        }

        return jpaQueryFactory
                .select(article.id)
                .from(article)
                .where(
                        equalSector(sector),
                        articleIdIn(filteredIds)
                )
                .fetch();
    }

    public BooleanExpression articleIdIn(Set<Long> articleIds) {
        if (CollectionUtils.isEmpty(articleIds)) {
            return null;
        }
        return article.id.in(articleIds);
    }

    public BooleanExpression articleIdIn(List<Long> articleIds) {
        if (CollectionUtils.isEmpty(articleIds)) {
            return null;
        }
        return article.id.in(articleIds);
    }

    public BooleanExpression equalSector(Sector sector) {
        if (sector == null) {
            return null;
        }
        return article.sector.eq(sector);
    }

    public BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return null;
        }
        return Expressions.numberTemplate(
                        Double.class,
                        ArticleFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                        formatSearchKeyword(searchKeyword)
                )
                .gt(MINIMUM_MATCH_SCORE);
    }

    public BooleanExpression applyCursor(Cursor<?> cursor) {
        if (cursor == null) {
            return null;
        }
        return cursor.getCursorExpression();
    }

    public String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(this::applyBooleanModeExpression)
                .collect(Collectors.joining(BLANK));
    }

    public String applyBooleanModeExpression(String keyword) {
        if (keyword.length() == 1) {
            return String.format("%s*", keyword);
        }
        return String.format("+%s*", keyword.toLowerCase());
    }

    public OrderSpecifier<?>[] toOrderBy(ArticleSortType sortBy) {
        if (sortBy == ArticleSortType.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }
}
