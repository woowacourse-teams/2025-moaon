package moaon.backend.project.domain;

import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.IntegerFormatter;

public class ViewsCursor extends AbstractCursor<Integer> {

    public ViewsCursor(String rawCursor) {
        super(rawCursor);
    }

    public ViewsCursor(Project project) {
        super(project.getViews(), project.getId());
    }

    @Override
    protected CursorFormatter<Integer> formatter() {
        return new IntegerFormatter();
    }
}
