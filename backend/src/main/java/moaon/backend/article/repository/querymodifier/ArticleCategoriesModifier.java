package moaon.backend.article.repository.querymodifier;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.repository.QueryModifier;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
public class ArticleCategoriesModifier implements QueryModifier<Void, ArticleQueryCondition> {

    private static final String ALL = "all";

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ArticleQueryCondition condition) {
        String categoryName = condition.categoryName();
        if (StringUtils.hasText(categoryName) && !categoryName.equals(ALL)) {
            whereBuilder.and(article.category.name.eq(categoryName));
        }

        return null;
    }
}
