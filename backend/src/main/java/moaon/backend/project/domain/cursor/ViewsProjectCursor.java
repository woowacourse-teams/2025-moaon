package moaon.backend.project.domain.cursor;

import moaon.backend.global.domain.cursor.AbstractCursor;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;
import moaon.backend.global.domain.cursor.formatter.IntegerFormatter;
import moaon.backend.project.domain.Project;

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
