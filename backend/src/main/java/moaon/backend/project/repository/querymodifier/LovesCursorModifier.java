package moaon.backend.project.repository.querymodifier;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.global.repository.QueryModifier;
import moaon.backend.project.dto.ProjectQueryCondition;

@RequiredArgsConstructor
public class LovesCursorModifier implements QueryModifier<Void, ProjectQueryCondition> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        Cursor<Integer> cursor = (Cursor<Integer>) condition.cursor();
        Integer sortValue = cursor.getSortValue();
        Long lastId = cursor.getLastId();

        whereBuilder.and(project.lovedMembers.size().lt(sortValue)
                .or(project.lovedMembers.size().eq(sortValue).and(project.id.lt(lastId)))
        );

        return null;
    }
}
