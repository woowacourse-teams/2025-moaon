package moaon.backend.project.domain;

import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.IntegerFormatter;

public class LovesCursor extends AbstractCursor<Integer> {

    public LovesCursor(String rawCursor) {
        super(rawCursor);
    }

    public LovesCursor(Project project) {
        super(project.getLoveCount(), project.getId());
    }

    @Override
    protected CursorFormatter<Integer> formatter() {
        return new IntegerFormatter();
    }
}
