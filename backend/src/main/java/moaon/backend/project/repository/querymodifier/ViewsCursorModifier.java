package moaon.backend.project.repository.querymodifier;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.QueryModifier;

@RequiredArgsConstructor
public class ViewsCursorModifier implements QueryModifier<Void> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        Cursor<Integer> cursor = (Cursor<Integer>) condition.cursor();
        Integer sortValue = cursor.getSortValue();
        Long lastId = cursor.getLastId();

        whereBuilder.and(project.views.lt(sortValue)
                .or(project.views.eq(sortValue).and(project.id.lt(lastId)))
        );

        return null;
    }
}
