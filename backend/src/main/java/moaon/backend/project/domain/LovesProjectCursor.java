package moaon.backend.project.domain;

import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.IntegerFormatter;

public class LovesProjectCursor extends AbstractCursor<Integer> {

    public LovesProjectCursor(String rawCursor) {
        super(rawCursor);
    }

    public LovesProjectCursor(Project project) {
        super(project.getLoveCount(), project.getId());
    }

    @Override
    protected CursorFormatter<Integer> formatter() {
        return new IntegerFormatter();
    }
}
