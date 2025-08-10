package moaon.backend.project.repository.querymodifier;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.global.repository.QueryModifier;
import moaon.backend.project.dto.ProjectQueryCondition;

@RequiredArgsConstructor
public class ProjectCreatedAtCursorModifier implements QueryModifier<Void, ProjectQueryCondition> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        Cursor<LocalDateTime> cursor = (Cursor<LocalDateTime>) condition.cursor();
        LocalDateTime sortValue = cursor.getSortValue();
        Long lastId = cursor.getLastId();

        whereBuilder.and(project.createdAt.lt(sortValue)
                .or(project.createdAt.eq(sortValue).and(project.id.lt(lastId)))
        );

        return null;
    }
}
