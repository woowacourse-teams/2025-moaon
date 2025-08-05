package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.global.cursor.CursorParser;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.project.domain.ProjectSortBy;

public record ProjectQueryCondition(
        String search,
        List<String> categoryNames,
        List<String> techStackNames,
        ProjectSortBy projectSortBy,
        int limit,
        ProjectCursor<?> cursor
) {

    public static ProjectQueryCondition of(
            String search,
            List<String> categories,
            List<String> techStacks,
            String sortBy,
            int limit,
            String cursor
    ) {

        ProjectSortBy sortType = ProjectSortBy.from(sortBy);
        return new ProjectQueryCondition(
                search,
                categories,
                techStacks,
                sortType,
                limit,
                CursorParser.toCursor(cursor, sortType)
        );
    }
}
