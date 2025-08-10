package moaon.backend.project.repository.querymodifier;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.QueryModifier;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.project.domain.CreatedAtCursor;
import moaon.backend.project.domain.LovesProjectCursor;
import moaon.backend.project.domain.ViewsProjectCursor;
import moaon.backend.project.dto.ProjectQueryCondition;

@RequiredArgsConstructor
public class CursorModifier implements QueryModifier<Void, ProjectQueryCondition> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        Cursor<?> cursor = condition.cursor();
        System.out.println("cursor = " + cursor);
        if (cursor == null) {
            return null;
        }

        if (cursor instanceof CreatedAtCursor) {
            return new CreatedAtCursorModifier(whereBuilder).modify(condition);
        }
        if (cursor instanceof ViewsProjectCursor) {
            return new ViewsCursorModifier(whereBuilder).modify(condition);
        }
        if (cursor instanceof LovesProjectCursor) {
            return new LovesCursorModifier(whereBuilder).modify(condition);
        }

        return null;
    }
}
