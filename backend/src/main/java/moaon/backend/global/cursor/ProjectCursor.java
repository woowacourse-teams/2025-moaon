package moaon.backend.global.cursor;

import com.querydsl.core.BooleanBuilder;
import moaon.backend.project.dto.ProjectQueryCondition;

public interface ProjectCursor<T extends Comparable<? super T>> {

    T getSortValue();

    Long getLastId();

    String getNextCursor();

    void applyCursor(
            ProjectQueryCondition queryCondition,
            BooleanBuilder booleanBuilder
    );
}
