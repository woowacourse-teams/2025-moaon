package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.article.domain.QArticleCategory.articleCategory;
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
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.Cursor;
import moaon.backend.global.config.FullTextSearchHQLFunction;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;
    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition) {
        Cursor<?> cursor = queryCondition.cursor();

        JPAQuery<Article> query = jpaQueryFactory.selectFrom(article)
                .distinct()
                .leftJoin(article.category, articleCategory)
                .leftJoin(article.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        applyWhereAndHaving(whereBuilder, queryCondition, query);

        if (cursor != null) {
            cursor.applyCursor(queryCondition, whereBuilder);
        }

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }

        query.groupBy(article.id)
                .orderBy(toOrderBy(queryCondition.sortBy()))
                .limit(queryCondition.limit() + FETCH_EXTRA_FOR_HAS_NEXT);

        return query.fetch();
    }

    private void applyWhereAndHaving(
            BooleanBuilder whereBuilder,
            ArticleQueryCondition queryCondition,
            JPAQuery<Article> query
    ) {
        String categoryName = queryCondition.categoryName();
        List<String> techStackNames = queryCondition.techStackNames();
        String search = queryCondition.search();

        if (!categoryName.equals("all")) {
            whereBuilder.and(article.category.name.eq(categoryName));
        }

        if (!CollectionUtils.isEmpty(techStackNames)) {
            whereBuilder.and(techStack.name.in(techStackNames));
            query.having(techStack.name.countDistinct().eq((long) techStackNames.size()));
        }

        if (StringUtils.hasText(search)) {
            whereBuilder.and(satisfiesMatchScore(search));
        }
    }

    private BooleanExpression satisfiesMatchScore(String search) {
        return Expressions.numberTemplate(
                Double.class,
                FullTextSearchHQLFunction.ARTICLE_EXPRESSION_TEMPLATE,
                formatSearchKeyword(search)
        ).gt(MINIMUM_MATCH_SCORE);
    }

    private String formatSearchKeyword(String search) {
        return Arrays.stream(search.split(BLANK))
                .map(keyword -> String.format("+%s*", keyword))
                .collect(Collectors.joining(BLANK));
    }

    private OrderSpecifier<?>[] toOrderBy(ArticleSortBy sortBy) {
        if (sortBy == ArticleSortBy.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }
}
