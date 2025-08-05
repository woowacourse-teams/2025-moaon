package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.article.domain.QArticleCategory.articleCategory;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.Cursor;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;

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

        if (!categoryName.equals("all")) {
            whereBuilder.and(article.category.name.eq(categoryName));
        }

        if (!CollectionUtils.isEmpty(techStackNames)) {
            whereBuilder.and(techStack.name.in(techStackNames));
            query.having(techStack.name.countDistinct().eq((long) techStackNames.size()));
        }
    }

    private OrderSpecifier<?>[] toOrderBy(ArticleSortBy sortBy) {
        if (sortBy == ArticleSortBy.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }
}
