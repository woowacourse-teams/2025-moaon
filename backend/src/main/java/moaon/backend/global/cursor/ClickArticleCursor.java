package moaon.backend.global.cursor;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ClickArticleCursor implements Cursor<Integer> {

    private final int clicks;
    private final Long id;

    @Override
    public Integer getSortValue() {
        return clicks;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return clicks + "_" + id;
    }

    @Override
    public BooleanExpression getCursorExpression() {
        return article.clicks.lt(getSortValue())
                .or(
                        article.clicks.eq(getSortValue())
                                .and(article.id.lt(getLastId()))
                );
    }
}
