package moaon.backend.project.domain;

import java.time.LocalDateTime;
import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.LocalDateTimeFormatter;

public class CreatedAtCursor extends AbstractCursor<LocalDateTime> {

    public CreatedAtCursor(String rawCursor) {
        super(rawCursor);
    }

    public CreatedAtCursor(Project project) {
        super(project.getCreatedAt(), project.getId());
    }

    @Override
    protected CursorFormatter<LocalDateTime> formatter() {
        return new LocalDateTimeFormatter();
    }
}
