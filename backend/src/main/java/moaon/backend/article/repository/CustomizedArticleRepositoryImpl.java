package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
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

    @Override
    public List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition) {
        Cursor<?> articleCursor = queryCondition.articleCursor();

        JPAQuery<Article> query = jpaQueryFactory.selectFrom(article)
                .distinct()
                .leftJoin(article.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        applyWhereAndHaving(whereBuilder, queryCondition, query);

        if (articleCursor != null) {
            articleCursor.applyCursor(whereBuilder);
        }

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }

        query.groupBy(article.id)
                .orderBy(toOrderBy(queryCondition.sortBy()))
                .limit(queryCondition.limit() + FETCH_EXTRA_FOR_HAS_NEXT);

        return query.fetch();
    }

    @Override
    public long countWithSearchCondition(ArticleQueryCondition queryCondition) {
        JPAQuery<Long> query = jpaQueryFactory.select(article.countDistinct())
                .from(article)
                .leftJoin(article.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        applyWhereAndHaving(whereBuilder, queryCondition, query);

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }

        return query.groupBy(article.id)
                .fetch()
                .size();
    }

    @Override
    public List<Article> findAllByProjectIdAndSector(long id, ProjectArticleQueryCondition condition) {
        JPAQuery<Article> query = jpaQueryFactory.selectFrom(article)
                .distinct()
                .leftJoin(article.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        whereBuilder.and(article.project.id.eq(id));

        applyWhereSector(whereBuilder, condition.sector());

        SearchKeyword searchKeyword = condition.search();
        if (searchKeyword.hasValue()) {
            whereBuilder.and(satisfiesMatchScore(condition.search()));
        }

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }
        return query.fetch();
    }

    private void applyWhereAndHaving(
            BooleanBuilder whereBuilder,
            ArticleQueryCondition queryCondition,
            JPAQuery<?> query
    ) {
        Sector sector = queryCondition.sector();
        List<Topic> topics = queryCondition.topics();
        List<String> techStackNames = queryCondition.techStackNames();
        SearchKeyword searchKeyword = queryCondition.search();

        applyWhereSector(whereBuilder, sector);
        if (!CollectionUtils.isEmpty(topics)) {
            for (Topic topic : topics) {
                whereBuilder.and(article.topics.contains(topic));
            }
        }

        if (!CollectionUtils.isEmpty(techStackNames)) {
            whereBuilder.and(techStack.name.in(techStackNames));
            query.having(techStack.name.countDistinct().eq((long) techStackNames.size()));
        }

        if (searchKeyword.hasValue()) {
            whereBuilder.and(satisfiesMatchScore(searchKeyword));
        }
    }

    private void applyWhereSector(BooleanBuilder whereBuilder, Sector sector) {
        if (sector != null) {
            whereBuilder.and(article.sector.eq(sector));
        }
    }

    private BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
        return Expressions.numberTemplate(
                Double.class,
                ArticleFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                formatSearchKeyword(searchKeyword)
        ).gt(MINIMUM_MATCH_SCORE);
    }

    private String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(this::applyExpressions)
                .collect(Collectors.joining(BLANK));
    }

    private String applyExpressions(String keyword) {
        if (keyword.length() == 1) {
            return String.format("%s*", keyword);
        }
        return String.format("+%s*", keyword.toLowerCase());
    }

    private OrderSpecifier<?>[] toOrderBy(ArticleSortType sortBy) {
        if (sortBy == ArticleSortType.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }
}
