package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.techStack.domain.QArticleTechStack.articleTechStack;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
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
        List<String> techStackNames = queryCondition.techStackNames();
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();
        List<Topic> topics = queryCondition.topics();
        int limit = queryCondition.limit();

        List<Long> articleIdsByTechStacks = findArticleIdsByTechStackNames(techStackNames);
        List<Long> articleIdsByTopics = findArticleIdsByTopics(topics);
        List<Long> articleIdsBySearch = findArticleIdsBySearchKeyword(searchKeyword);
        Set<Long> filteredIds = intersectionIds(
                articleIdsByTechStacks,
                articleIdsByTopics,
                articleIdsBySearch
        );
        List<Long> articleIdsBySector = findArticleIdsBySector(sector, filteredIds);

        return jpaQueryFactory
                .selectFrom(article)
                .where(
                        applyCursor(articleCursor),
                        articleIdIn(articleIdsBySector)
                )
                .orderBy(toOrderByWithSector(sortBy, sector))
                .limit(limit + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    private Set<Long> intersectionIds(
            List<Long> ids1,
            List<Long> ids2,
            List<Long> ids3
    ) {
        List<List<Long>> allLists = new ArrayList<>(List.of(ids1, ids2, ids3));

        List<Long> smallestList = Collections.min(allLists, Comparator.comparingInt(List::size));
        Set<Long> intersection = new HashSet<>(smallestList);
        allLists.remove(smallestList);
        for (List<Long> currentList : allLists) {
            intersection.retainAll(new HashSet<>(currentList));
        }

        return intersection;
    }

    private List<Long> findArticleIdsByTechStackNames(List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return null;
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

    private List<Long> findArticleIdsByTopics(List<Topic> topics) { // articleTopics 엔티티가 없음. NativeQuery로?
        if (CollectionUtils.isEmpty(topics)) {
            return null;
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

        return query.getResultList();
    }

    private List<Long> findArticleIdsBySearchKeyword(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return null;
        }
        return jpaQueryFactory
                .select(article.id)
                .from(article)
                .where(satisfiesMatchScore(searchKeyword))
                .fetch();
    }

    private List<Long> findArticleIdsBySector(Sector sector, Set<Long> filteredIds) {
        return jpaQueryFactory
                .select(article.id)
                .from(article)
                .where(
                        equalSector(sector),
                        articleIdIn(filteredIds)
                )
                .fetch();
    }

    private BooleanExpression articleIdIn(Set<Long> articleIds) {
        if (CollectionUtils.isEmpty(articleIds)) {
            return null;
        }
        return article.id.in(articleIds);
    }

    private BooleanExpression articleIdIn(List<Long> articleIds) {
        if (CollectionUtils.isEmpty(articleIds)) {
            return null;
        }
        return article.id.in(articleIds);
    }

    @Override
    public long countWithSearchCondition(ArticleQueryCondition queryCondition) {
//        if (hasTechStackFilter(queryCondition)) {
//            return countWithTechStackFilter(queryCondition);
//        }
//
//        SearchKeyword searchKeyword = queryCondition.search();
//        Sector sector = queryCondition.sector();
//        List<Topic> topics = queryCondition.topics();
//
//        return Optional.ofNullable(jpaQueryFactory
//                        .select(article.count())
//                        .from(article)
//                        .where(
//                                equalSector(sector),
//                                satisfiesMatchScore(searchKeyword),
//                                containsAllTopics(topics)
//                        )
//                        .fetchOne())
//                .orElse(0L);
        return 0;
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

    private BooleanExpression equalSector(Sector sector) {
        if (sector == null) {
            return null;
        }
        return article.sector.eq(sector);
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
}
