package moaon.backend.project.repository.querymodifier;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.QueryModifier;

@RequiredArgsConstructor
public class CursorModifier implements QueryModifier<Void> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        ProjectCursor<?> cursor = condition.cursor();
        if (cursor != null) {
            cursor.applyCursor(whereBuilder);
        }

        return null;
    }
}
