package moaon.backend.project.domain;

import java.util.Arrays;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.cursor.Cursor;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
public enum ProjectSortType {

    CREATED_AT("createdAt", CreatedAtCursor::new, CreatedAtCursor::new),

    VIEWS("views", ViewsCursor::new, ViewsCursor::new),

    LOVES("loves", LovesCursor::new, LovesCursor::new);

    private final String sortType;
    private final Function<String, Cursor<?>> stringToCursorFunction;
    private final Function<Project, Cursor<?>> projectToCursorFunction;

    public Cursor<?> toCursor(String cursor) {
        if (!StringUtils.hasText(cursor)) {
            return null;
        }
        return stringToCursorFunction.apply(cursor);
    }

    public Cursor<?> toCursor(Project project) {
        return projectToCursorFunction.apply(project);
    }

    public static ProjectSortType from(String sortType) {
        return Arrays.stream(ProjectSortType.values())
                .filter(sortBy -> sortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }
}
