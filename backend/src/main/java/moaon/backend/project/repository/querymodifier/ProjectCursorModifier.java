package moaon.backend.project.repository.querymodifier;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.global.repository.QueryModifier;
import moaon.backend.project.domain.cursor.CreatedAtCursor;
import moaon.backend.project.domain.cursor.LovesProjectCursor;
import moaon.backend.project.domain.cursor.ViewsProjectCursor;
import moaon.backend.project.dto.ProjectQueryCondition;

@RequiredArgsConstructor
public class ProjectCursorModifier implements QueryModifier<Void, ProjectQueryCondition> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        Cursor<?> cursor = condition.cursor();
        if (cursor == null) {
            return null;
        }

        if (cursor instanceof CreatedAtCursor) {
            return new ProjectCreatedAtCursorModifier(whereBuilder).modify(condition);
        }
        if (cursor instanceof ViewsProjectCursor) {
            return new ProjectViewsCursorModifier(whereBuilder).modify(condition);
        }
        if (cursor instanceof LovesProjectCursor) {
            return new ProjectLovesCursorModifier(whereBuilder).modify(condition);
        }

        return null;
    }
}
