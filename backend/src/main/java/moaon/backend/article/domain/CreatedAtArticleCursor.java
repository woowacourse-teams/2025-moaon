package moaon.backend.article.domain;

import java.time.LocalDateTime;
import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.LocalDateTimeFormatter;

public class CreatedAtArticleCursor extends AbstractCursor<LocalDateTime> {

    public CreatedAtArticleCursor(String rawCursor) {
        super(rawCursor);
    }

    public CreatedAtArticleCursor(Article article) {
        super(article.getCreatedAt(), article.getId());
    }

    public CreatedAtArticleCursor(LocalDateTime createdAt, Long id) {
        super(createdAt, id);
    }

    @Override
    protected CursorFormatter<LocalDateTime> formatter() {
        return new LocalDateTimeFormatter();
    }
}
