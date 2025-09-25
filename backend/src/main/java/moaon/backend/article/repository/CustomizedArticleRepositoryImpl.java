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
        if (hasTopicFilter(queryCondition)) {
            return findWithTopicFilter(queryCondition);
        }
        return findWithBasicFilter(queryCondition);
    }

    @Override
    public long countWithSearchCondition(ArticleQueryCondition queryCondition) {
        if (hasTechStackFilter(queryCondition)) {
            return countWithTechStackFilter(queryCondition);
        }
        if (hasTopicFilter(queryCondition)) {
            return countWithTopicFilter(queryCondition);
        }
        return countWithBasicFilter(queryCondition);
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

    @Override
    public List<Article> findWithTechStackFilter(ArticleQueryCondition queryCondition) {
        String selectClause = String.join("\n",
                "SELECT a1_0.id, a1_0.article_url, a1_0.clicks, a1_0.content,",
                "a1_0.created_at, a1_0.project_id, a1_0.sector, a1_0.summary,",
                "a1_0.title, a1_0.updated_at");

        String sql = String.join("\n",
                selectClause,
                buildCommonTechStackQuery(queryCondition),
                buildOrderByClause(queryCondition),
                "LIMIT :limit");

        Query query = entityManager.createNativeQuery(sql, Article.class);
        setCommonTechStackParameters(query, queryCondition);
        query.setParameter("limit", queryCondition.limit() + FETCH_EXTRA_FOR_HAS_NEXT);

        return query.getResultList();
    }

    @Override
    public long countWithTechStackFilter(ArticleQueryCondition queryCondition) {
        String sql = String.join(" ",
                "SELECT COUNT(*)",
                buildCommonTechStackQuery(queryCondition));

        Query query = entityManager.createNativeQuery(sql);
        setCommonTechStackParameters(query, queryCondition);

        Object result = query.getSingleResult();
        return ((Number) result).longValue();
    }

    @Override
    public List<Article> findWithTopicFilter(ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        List<Topic> topics = queryCondition.topics();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();
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
    public long countWithTopicFilter(ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        List<Topic> topics = queryCondition.topics();

        return jpaQueryFactory
                .select(article.count())
                .from(article)
                .where(
                        equalSector(sector),
                        containsAllTopics(topics),
                        satisfiesMatchScore(searchKeyword)
                )
                .fetchOne();
    }

    @Override
    public List<Article> findWithBasicFilter(ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();
        int limit = queryCondition.limit();

        return jpaQueryFactory
                .selectFrom(article)
                .where(
                        equalSector(sector),
                        applyCursor(articleCursor),
                        satisfiesMatchScore(searchKeyword)
                )
                .orderBy(toOrderByWithSector(sortBy, sector))
                .limit(limit + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    @Override
    public long countWithBasicFilter(ArticleQueryCondition queryCondition) {
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

    private boolean hasTopicFilter(ArticleQueryCondition queryCondition) {
        return !CollectionUtils.isEmpty(queryCondition.topics());
    }

    private String buildCommonTechStackQuery(ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();

        StringBuilder sql = new StringBuilder(300);
        sql.append("FROM article a1_0 ")
                .append("JOIN ( ")
                .append("    SELECT ts1_0.article_id ")
                .append("    FROM article_tech_stack ts1_0 ")
                .append("    JOIN tech_stack ts2_0 ON ts2_0.id = ts1_0.tech_stack_id ")
                .append("    WHERE ts2_0.name IN (:techStackNames) ")
                .append("    GROUP BY ts1_0.article_id ")
                .append("    HAVING COUNT(DISTINCT ts1_0.tech_stack_id) = :techStackCount ")
                .append(") AS filtered_articles ON a1_0.id = filtered_articles.article_id ")
                .append("WHERE 1=1 ");

        if (sector != null) {
            sql.append("AND a1_0.sector = :sector ");
        }
        if (searchKeyword != null && searchKeyword.hasValue()) {
            sql.append("AND MATCH(a1_0.title, a1_0.summary, a1_0.content) AGAINST(:searchQuery IN BOOLEAN MODE) ");
        }
        if (articleCursor != null) {
            if (sortBy == ArticleSortType.CLICKS) {
                sql.append(
                        "AND (a1_0.clicks < :cursorClicks OR (a1_0.clicks = :cursorClicks AND a1_0.id < :cursorId)) ");
            } else {
                sql.append(
                        "AND (a1_0.created_at < :cursorCreatedAt OR (a1_0.created_at = :cursorCreatedAt AND a1_0.id < :cursorId)) ");
            }
        }

        return sql.toString();
    }

    private String buildOrderByClause(ArticleQueryCondition queryCondition) {
        Sector sector = queryCondition.sector();
        ArticleSortType sortBy = queryCondition.sortBy();

        StringBuilder sql = new StringBuilder(100);
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

    private void setCommonTechStackParameters(Query query, ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        List<String> techStackNames = queryCondition.techStackNames();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();

        query.setParameter("techStackNames", techStackNames);
        query.setParameter("techStackCount", techStackNames.size());

        if (sector != null) {
            query.setParameter("sector", sector.name());
        }
        if (searchKeyword != null && searchKeyword.hasValue()) {
            query.setParameter("searchQuery", formatSearchKeyword(searchKeyword));
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
