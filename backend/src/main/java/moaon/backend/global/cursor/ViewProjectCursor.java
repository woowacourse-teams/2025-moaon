package moaon.backend.global.cursor;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ViewProjectCursor implements ProjectCursor<Integer> {

    private final int views;
    private final Long id;

    @Override
    public Integer getSortValue() {
        return views;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return views + "_" + id;
    }

    @Override
    public void applyCursor(BooleanBuilder whereBuilder) {
        whereBuilder.and(
                project.views.lt(getSortValue())
                        .or(
                                project.views.eq(getSortValue())
                                        .and(project.id.lt(getLastId()))
                        )
        );
    }
}
