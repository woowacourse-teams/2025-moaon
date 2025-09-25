package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.techStack.domain.QArticleTechStack.articleTechStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;
    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";

    private final JPAQueryFactory jpaQueryFactory;
    private final EntityManager entityManager;

    @Override
    public List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition) {
        if (hasTechStackFilter(queryCondition)) {
            return findWithTechStackFilter(queryCondition);
        }

        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();
        List<Topic> topics = queryCondition.topics();
        int limit = queryCondition.limit();

        return jpaQueryFactory
                .selectFrom(article)
                .where(
                        equalSector(sector),
                        applyCursor(articleCursor),
                        satisfiesMatchScore(searchKeyword),
                        containsAllTopics(topics)
                )
                .orderBy(toOrderByWithSector(sortBy, sector))
                .limit(limit + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    @Override
    public long countWithSearchCondition(ArticleQueryCondition queryCondition) {
        if (hasTechStackFilter(queryCondition)) {
            return countWithTechStackFilter(queryCondition);
        }

        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();

        return jpaQueryFactory
                .select(article.count())
                .from(article)
                .where(
                        equalSector(sector),
                        satisfiesMatchScore(searchKeyword)
                )
                .fetchOne();
    }

    @Override
    public List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition) {
        SearchKeyword searchKeyword = condition.search();
        Sector sector = condition.sector();

        return jpaQueryFactory.
                selectFrom(article).distinct()
                .leftJoin(article.techStacks, articleTechStack)
                .where(
                        article.project.id.eq(id),
                        equalSector(sector),
                        satisfiesMatchScore(searchKeyword)
                )
                .fetch();
    }

    private List<Article> findWithTechStackFilter(ArticleQueryCondition queryCondition) {
        String sql = String.join("\n",
                "SELECT a1_0.id, a1_0.article_url, a1_0.clicks, a1_0.content,",
                "a1_0.created_at, a1_0.project_id, a1_0.sector, a1_0.summary,",
                "a1_0.title, a1_0.updated_at",
                buildFromAndJoinClause(),
                buildWhereClause(queryCondition),
                buildOrderByClause(queryCondition),
                "LIMIT :limit"
        );

        Query query = entityManager.createNativeQuery(sql, Article.class);
        setTechStackParameters(query, queryCondition);
        query.setParameter("limit", queryCondition.limit() + FETCH_EXTRA_FOR_HAS_NEXT);

        return query.getResultList();
    }

    private long countWithTechStackFilter(ArticleQueryCondition queryCondition) {
        String sql = String.join("\n",
                "SELECT COUNT(*)",
                buildFromAndJoinClause(),
                buildWhereClause(queryCondition)
        );

        Query query = entityManager.createNativeQuery(sql);
        setTechStackParameters(query, queryCondition);

        Object result = query.getSingleResult();
        return ((Number) result).longValue();
    }

    private BooleanExpression equalSector(Sector sector) {
        if (sector == null) {
            return null;
        }
        return article.sector.eq(sector);
    }

    private BooleanExpression containsAllTopics(List<Topic> topics) {
        if (CollectionUtils.isEmpty(topics)) {
            return null;
        }
        return topics.stream()
                .map(article.topics::contains)
                .reduce(BooleanExpression::and)
                .orElse(null);
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

    private BooleanExpression applyCursor(Cursor<?> cursor) {
        if (cursor == null) {
            return null;
        }
        return cursor.getCursorExpression();
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

    private OrderSpecifier<?>[] toOrderByWithSector(ArticleSortType sortBy, Sector sector) {
        if (sector == null) {
            return toOrderBy(sortBy);
        }

        if (sortBy == ArticleSortType.CLICKS) {
            return new OrderSpecifier<?>[]{
                    article.sector.asc(),
                    article.clicks.desc(),
                    article.id.desc()
            };
        }

        return new OrderSpecifier<?>[]{
                article.sector.asc(),
                article.createdAt.desc(),
                article.id.desc()
        };
    }

    private OrderSpecifier<?>[] toOrderBy(ArticleSortType sortBy) {
        if (sortBy == ArticleSortType.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }

    private boolean hasTechStackFilter(ArticleQueryCondition queryCondition) {
        return !CollectionUtils.isEmpty(queryCondition.techStackNames());
    }

    private String buildFromAndJoinClause() {
        return "FROM article a1_0 " +
                "JOIN ( " +
                "    SELECT ts1_0.article_id " +
                "    FROM article_tech_stack ts1_0 " +
                "    JOIN tech_stack ts2_0 ON ts2_0.id = ts1_0.tech_stack_id " +
                "    WHERE ts2_0.name IN (:techStackNames) " +
                "    GROUP BY ts1_0.article_id " +
                "    HAVING COUNT(DISTINCT ts1_0.tech_stack_id) = :techStackCount " +
                ") AS filtered_articles ON a1_0.id = filtered_articles.article_id " +
                "WHERE 1=1 ";
    }

    private String buildWhereClause(ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();
        List<Topic> topics = queryCondition.topics();

        StringBuilder whereClause = new StringBuilder();

        if (sector != null) {
            whereClause.append("AND a1_0.sector = :sector ");
        }
        if (searchKeyword != null && searchKeyword.hasValue()) {
            whereClause.append(
                    "AND MATCH(a1_0.title, a1_0.summary, a1_0.content) AGAINST(:searchQuery IN BOOLEAN MODE) ");
        }
        if (!CollectionUtils.isEmpty(topics)) {
            for (int i = 0; i < topics.size(); i++) {
                whereClause.append("AND :topic").append(i).append(" IN (")
                           .append("SELECT t1_0.topics FROM article_topics t1_0 WHERE a1_0.id = t1_0.article_id")
                           .append(") ");
            }
        }
        if (articleCursor != null) {
            if (sortBy == ArticleSortType.CLICKS) {
                whereClause.append(
                        "AND (a1_0.clicks < :cursorClicks OR (a1_0.clicks = :cursorClicks AND a1_0.id < :cursorId)) ");
            } else {
                whereClause.append(
                        "AND (a1_0.created_at < :cursorCreatedAt OR (a1_0.created_at = :cursorCreatedAt AND a1_0.id < :cursorId)) ");
            }
        }

        return whereClause.toString();
    }

    private String buildOrderByClause(ArticleQueryCondition queryCondition) {
        Sector sector = queryCondition.sector();
        ArticleSortType sortBy = queryCondition.sortBy();

        StringBuilder sql = new StringBuilder();
        sql.append("ORDER BY ");
        if (sector != null) {
            sql.append("a1_0.sector ASC, ");
        }
        if (sortBy == ArticleSortType.CLICKS) {
            sql.append("a1_0.clicks DESC, ");
        } else {
            sql.append("a1_0.created_at DESC, ");
        }
        sql.append("a1_0.id DESC ");

        return sql.toString();
    }

    private void setTechStackParameters(Query query, ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        List<String> techStackNames = queryCondition.techStackNames();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();
        List<Topic> topics = queryCondition.topics();

        query.setParameter("techStackNames", techStackNames);
        query.setParameter("techStackCount", techStackNames.size());

        if (sector != null) {
            query.setParameter("sector", sector.name());
        }
        if (searchKeyword != null && searchKeyword.hasValue()) {
            query.setParameter("searchQuery", formatSearchKeyword(searchKeyword));
        }
        if (!CollectionUtils.isEmpty(topics)) {
            for (int i = 0; i < topics.size(); i++) {
                query.setParameter("topic" + i, topics.get(i).name());
            }
        }
        if (articleCursor != null) {
            if (sortBy == ArticleSortType.CLICKS) {
                query.setParameter("cursorClicks", articleCursor.getSortValue());
                query.setParameter("cursorId", articleCursor.getLastId());
            } else {
                query.setParameter("cursorCreatedAt", articleCursor.getSortValue());
                query.setParameter("cursorId", articleCursor.getLastId());
            }
        }
    }
}
