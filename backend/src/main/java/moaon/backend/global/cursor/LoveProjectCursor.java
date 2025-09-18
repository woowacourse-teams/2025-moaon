package moaon.backend.global.cursor;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoveProjectCursor implements Cursor<Integer> {

    private final Integer loves;
    private final Long id;


    @Override
    public Integer getSortValue() {
        return loves;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return loves + "_" + id;
    }

    @Override
    public BooleanExpression getCursorExpression() {
        return project.lovedMembers.size().lt(getSortValue())
                .or(
                        project.lovedMembers.size().eq(getSortValue())
                                .and(project.id.lt(getLastId()))
                );
    }
}
