package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.project.domain.ProjectSortType;

public record ProjectQueryCondition(
        String search,
        List<String> categoryNames,
        List<String> techStackNames,
        ProjectSortType projectSortType,
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
        ProjectSortType sortType = ProjectSortType.from(sortBy);
        return new ProjectQueryCondition(
                search,
                categories,
                techStacks,
                sortType,
                limit,
                sortType.toCursor(cursor)
        );
    }
}
