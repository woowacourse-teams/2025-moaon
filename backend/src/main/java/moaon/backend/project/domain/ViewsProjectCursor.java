package moaon.backend.project.domain;

import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.IntegerFormatter;

public class ViewsProjectCursor extends AbstractCursor<Integer> {

    public ViewsProjectCursor(String rawCursor) {
        super(rawCursor);
    }

    public ViewsProjectCursor(Project project) {
        super(project.getViews(), project.getId());
    }

    @Override
    protected CursorFormatter<Integer> formatter() {
        return new IntegerFormatter();
    }
}
