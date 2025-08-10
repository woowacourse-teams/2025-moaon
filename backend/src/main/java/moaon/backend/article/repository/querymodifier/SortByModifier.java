package moaon.backend.article.repository.querymodifier;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.types.OrderSpecifier;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.repository.QueryModifier;

public class SortByModifier implements QueryModifier<OrderSpecifier<?>[], ArticleQueryCondition> {

    @Override
    public OrderSpecifier<?>[] modify(ArticleQueryCondition condition) {
        ArticleSortType sortBy = condition.sortBy();
        if (sortBy == ArticleSortType.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }
}
