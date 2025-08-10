package moaon.backend.article.repository.querymodifier;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ClickArticleCursor;
import moaon.backend.article.domain.CreatedAtArticleCursor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.QueryModifier;
import moaon.backend.global.domain.cursor.Cursor;

@RequiredArgsConstructor
public class CursorModifier implements QueryModifier<Void> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ArticleQueryCondition condition) {
        Cursor<?> cursor = condition.articleCursor();
        if (cursor == null) {
            return null;
        }

        if (cursor instanceof CreatedAtArticleCursor) {
            return new CreatedAtCursorModifier(whereBuilder).modify(condition);
        }
        if (cursor instanceof ClickArticleCursor) {
            return new ClicksCursorModifier(whereBuilder).modify(condition);
        }

        return null;
    }
}
