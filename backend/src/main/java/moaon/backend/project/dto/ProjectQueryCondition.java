package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.domain.ProjectSortType;
import org.springframework.util.CollectionUtils;

public record ProjectQueryCondition(
        SearchKeyword search,
        List<String> categoryNames,
        List<String> techStackNames,
        ProjectSortType projectSortType,
        int limit,
        Cursor<?> cursor
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
                categories == null ? List.of() : categories,
                techStacks == null ? List.of() : techStacks,
                sortType,
                limit,
                sortType.toCursor(cursor)
        );
    }

    public boolean isEmptyFilter() {
        return CollectionUtils.isEmpty(categoryNames) &&
                CollectionUtils.isEmpty(techStackNames) &&
                (search == null || !search.hasValue());
    }
}
