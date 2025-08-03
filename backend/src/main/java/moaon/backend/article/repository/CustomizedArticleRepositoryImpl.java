package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.article.domain.QArticleCategory.articleCategory;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.Cursor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    public static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition) {
        String categoryName = queryCondition.categoryName();
        List<String> techStackNames = queryCondition.techStackNames();
        Cursor<?> cursor = queryCondition.cursor();

        JPAQuery<Article> query = jpaQueryFactory.selectFrom(article)
                .distinct()
                .leftJoin(article.category, articleCategory)
                .leftJoin(article.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();
        BooleanBuilder havingBuilder = new BooleanBuilder();

        if (categoryName != null && !categoryName.isEmpty()) {
            whereBuilder.and(article.category.name.in(categoryName));
        }

        if (techStackNames != null && !techStackNames.isEmpty()) {
            whereBuilder.and(techStack.name.in(techStackNames));
            havingBuilder.and(techStack.name.countDistinct().eq((long) techStackNames.size()));
        }

        if (queryCondition.sortBy() == ArticleSortBy.CLICKS) {
            whereBuilder.and(article.clicks.lt((Integer) cursor.getSortValue())
                    .or(article.clicks.eq((Integer) cursor.getSortValue())
                            .and(article.id.lt(cursor.getLastId()))));
        }

        if (queryCondition.sortBy() == ArticleSortBy.CREATED_AT) {
            whereBuilder.and(article.createdAt.lt((LocalDateTime) cursor.getSortValue())
                    .or(article.createdAt.eq((LocalDateTime) cursor.getSortValue())
                            .and(article.id.lt(cursor.getLastId()))));
        }

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }

        if (havingBuilder.hasValue()) {
            query.having(havingBuilder);
        }

        query.groupBy(article.id)
                .orderBy(toOrderBy(queryCondition.sortBy()))
                .limit(queryCondition.limit() + FETCH_EXTRA_FOR_HAS_NEXT);

        return query.fetch();
    }

    private OrderSpecifier<?>[] toOrderBy(ArticleSortBy sortBy) {
        if (sortBy == ArticleSortBy.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }
}
