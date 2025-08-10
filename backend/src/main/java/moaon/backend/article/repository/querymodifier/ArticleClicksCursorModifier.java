package moaon.backend.article.repository.querymodifier;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.global.repository.QueryModifier;

@RequiredArgsConstructor
public class ArticleClicksCursorModifier implements QueryModifier<Void, ArticleQueryCondition> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ArticleQueryCondition condition) {
        Cursor<Integer> cursor = (Cursor<Integer>) condition.articleCursor();
        Integer sortValue = cursor.getSortValue();
        Long lastId = cursor.getLastId();

        whereBuilder.and(article.clicks.lt(sortValue)
                .or(article.clicks.eq(sortValue).and(article.id.lt(lastId)))
        );

        return null;
    }
}
