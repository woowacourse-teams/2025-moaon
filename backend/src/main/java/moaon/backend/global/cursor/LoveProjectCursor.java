package moaon.backend.global.cursor;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.project.dto.ProjectQueryCondition;

@RequiredArgsConstructor
public class LoveProjectCursor implements ProjectCursor<Integer> {

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
    public void applyCursor(ProjectQueryCondition queryCondition, BooleanBuilder whereBuilder) {
        whereBuilder.and(
                project.lovedMembers.size().lt(getSortValue())
                        .or(
                                project.lovedMembers.size().eq(getSortValue())
                                        .and(project.id.lt(getLastId()))
                        )
        );
    }
}
