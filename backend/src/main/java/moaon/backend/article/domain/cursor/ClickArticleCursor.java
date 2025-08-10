package moaon.backend.article.domain.cursor;

import moaon.backend.article.domain.Article;
import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.IntegerFormatter;

public class ClickArticleCursor extends AbstractCursor<Integer> {

    public ClickArticleCursor(String rawCursor) {
        super(rawCursor);
    }

    public ClickArticleCursor(Article article) {
        super(article.getClicks(), article.getId());
    }

    public ClickArticleCursor(Integer clicks, Long id) {
        super(clicks, id);
    }

    @Override
    protected CursorFormatter<Integer> formatter() {
        return new IntegerFormatter();
    }
}
