package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.article.domain.QArticleCategory.articleCategory;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.querymodifier.ArticleCategoriesModifier;
import moaon.backend.article.repository.querymodifier.ArticleCursorModifier;
import moaon.backend.article.repository.querymodifier.ArticleSearchKeywordModifier;
import moaon.backend.article.repository.querymodifier.ArticleSortByModifier;
import moaon.backend.article.repository.querymodifier.ArticleTechStacksModifier;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition) {
        JPAQuery<Article> query = jpaQueryFactory.selectFrom(article)
                .distinct()
                .leftJoin(article.category, articleCategory)
                .leftJoin(article.techStacks, techStack);

        return query.groupBy(article.id)
                .where(constructWhereClause(queryCondition, query))
                .orderBy(new ArticleSortByModifier().modify(queryCondition))
                .limit(queryCondition.limit() + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    @Override
    public long countWithSearchCondition(ArticleQueryCondition queryCondition) {
        JPAQuery<Long> query = jpaQueryFactory.select(article.countDistinct())
                .from(article)
                .leftJoin(article.category, articleCategory)
                .leftJoin(article.techStacks, techStack);

        return query.groupBy(article.id)
                .where(constructWhereClause(queryCondition, query))
                .fetch()
                .size();
    }

    @Override
    public List<Article> findAllByProjectIdAndCategory(long id, String category) {
        return jpaQueryFactory.selectFrom(article)
                .leftJoin(article.category, articleCategory)
                .leftJoin(article.techStacks, techStack)
                .where(article.project.id.eq(id))
                .where(articleCategory.name.eq(category))
                .distinct()
                .fetch();
    }

    private BooleanBuilder constructWhereClause(
            ArticleQueryCondition queryCondition,
            JPAQuery<?> query
    ) {
        BooleanBuilder whereBuilder = new BooleanBuilder();

        new ArticleTechStacksModifier(query, whereBuilder).modify(queryCondition);
        new ArticleCategoriesModifier(whereBuilder).modify(queryCondition);
        new ArticleSearchKeywordModifier(whereBuilder).modify(queryCondition);
        new ArticleCursorModifier(whereBuilder).modify(queryCondition);

        return whereBuilder;
    }
}
