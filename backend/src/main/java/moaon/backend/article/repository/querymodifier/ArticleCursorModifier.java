package moaon.backend.article.repository.querymodifier;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.cursor.ClickArticleCursor;
import moaon.backend.article.domain.cursor.CreatedAtArticleCursor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.global.repository.QueryModifier;

@RequiredArgsConstructor
public class ArticleCursorModifier implements QueryModifier<Void, ArticleQueryCondition> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ArticleQueryCondition condition) {
        Cursor<?> cursor = condition.articleCursor();
        if (cursor == null) {
            return null;
        }

        if (cursor instanceof CreatedAtArticleCursor) {
            return new ArticleCreatedAtCursorModifier(whereBuilder).modify(condition);
        }
        if (cursor instanceof ClickArticleCursor) {
            return new ArticleClicksCursorModifier(whereBuilder).modify(condition);
        }

        return null;
    }
}
