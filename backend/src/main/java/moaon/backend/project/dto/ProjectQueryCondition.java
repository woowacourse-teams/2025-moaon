package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.domain.ProjectSortType;

public record ProjectQueryCondition(
        SearchKeyword search,
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
                new SearchKeyword(search),
                categories,
                techStacks,
                sortType,
                limit,
                sortType.toCursor(cursor)
        );
    }

    
}
