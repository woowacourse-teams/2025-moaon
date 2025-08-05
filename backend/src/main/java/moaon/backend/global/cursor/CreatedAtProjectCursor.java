package moaon.backend.global.cursor;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import moaon.backend.project.dto.ProjectQueryCondition;

@RequiredArgsConstructor
public class CreatedAtProjectCursor implements ProjectCursor<LocalDateTime> {

    private final LocalDateTime createdAt;
    private final Long id;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public LocalDateTime getSortValue() {
        return createdAt;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return createdAt.format(FORMATTER) + "_" + id;
    }

    @Override
    public void applyCursor(ProjectQueryCondition queryCondition, BooleanBuilder whereBuilder) {
        whereBuilder.and(project.createdAt.lt(getSortValue()))
                .or(project.createdAt.eq(getSortValue())
                        .and(project.id.lt(getLastId())));
    }
}
