package moaon.backend.article.dao;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.techStack.domain.QArticleTechStack.articleTechStack;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.repository.db.ArticleFullTextSearchHQLFunction;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class ArticleDao {

    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;
    private static final String BLANK = " ";

    private final JPAQueryFactory jpaQueryFactory;
    private final EntityManager entityManager;

    public List<Article> findAllBy(
            Set<Long> ids,
            ArticleCursor cursor,
            int limit,
            ArticleSortType sortType
    ) {
        return jpaQueryFactory
                .selectFrom(article)
                .where(
                        idIn(ids),
                        cursorWhereClause(cursor, sortType)
                )
                .orderBy(toOrderBy(sortType))
                .limit(limit + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    public List<Article> findAllBy(
            long projectId,
            Sector sector,
            SearchKeyword searchKeyword
    ) {
        return jpaQueryFactory.
                selectFrom(article)
                .where(
                        article.project.id.eq(projectId),
                        equalSector(sector),
                        satisfiesMatchScore(searchKeyword)
                )
                .fetch();
    }

    public Set<Long> findIdsByTechStackNames(List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return new HashSet<>();
        }

        return new HashSet<>(
                jpaQueryFactory
                        .select(articleTechStack.article.id)
                        .from(articleTechStack)
                        .join(articleTechStack.techStack, techStack)
                        .where(techStack.name.in(techStackNames))
                        .groupBy(articleTechStack.article.id)
                        .having(techStack.name.count().eq((long) techStackNames.size()))
                        .fetch()
        );
    }

    public Set<Long> findIdsByTopics(List<Topic> topics) {
        if (CollectionUtils.isEmpty(topics)) {
            return new HashSet<>();
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
        Query query = entityManager.createNativeQuery(sql, Long.class);
        query.setParameter("topics", topics.stream().map(Topic::name).toList());
        query.setParameter("topicCount", topics.size());
        return new HashSet<>(query.getResultList());
    }

    public Set<Long> findIdsBySearchKeyword(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return new HashSet<>();
        }

        return new HashSet<>(
                jpaQueryFactory
                        .select(article.id)
                        .from(article)
                        .where(satisfiesMatchScore(searchKeyword))
                        .fetch()
        );
    }

    public Set<Long> findIdsBySectorAndIds(Sector sector, Set<Long> filteredIds) {
        if (sector == null && CollectionUtils.isEmpty(filteredIds)) {
            return new HashSet<>();
        }

        return new HashSet<>(
                jpaQueryFactory
                        .select(article.id)
                        .from(article)
                        .where(
                                equalSector(sector),
                                idIn(filteredIds)
                        )
                        .fetch()
        );
    }

    public long count() {
        return Optional.ofNullable(
                        jpaQueryFactory
                                .select(article.count())
                                .from(article)
                                .fetchOne()
                )
                .orElse(0L);
    }

    private BooleanExpression idIn(Set<Long> articleIds) {
        if (CollectionUtils.isEmpty(articleIds)) {
            return null;
        }
        return article.id.in(articleIds);
    }

    private BooleanExpression equalSector(Sector sector) {
        if (sector == null) {
            return null;
        }
        return article.sector.eq(sector);
    }

    private BooleanExpression cursorWhereClause(ArticleCursor cursor, ArticleSortType sortType) {
        if (cursor == null) {
            return null;
        }

        return CursorExpressionMapper.toWhereClause(cursor, sortType);
    }

    private BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
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

    private OrderSpecifier<?>[] toOrderBy(ArticleSortType sortBy) {
        if (sortBy == ArticleSortType.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }

    private String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(this::applyBooleanModeExpression)
                .collect(Collectors.joining(BLANK));
    }

    private String applyBooleanModeExpression(String keyword) {
        if (keyword.length() == 1) {
            return String.format("%s*", keyword);
        }
        return String.format("+%s*", keyword.toLowerCase());
    }
}
