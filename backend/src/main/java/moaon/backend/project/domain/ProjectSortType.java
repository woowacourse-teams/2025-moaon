package moaon.backend.project.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import moaon.backend.global.cursor.CreatedAtProjectCursor;
import moaon.backend.global.cursor.LoveProjectCursor;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.global.cursor.ViewProjectCursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public enum ProjectSortType {

    CREATED_AT("createdAt",
            cursor -> parseCursor(cursor, ProjectSortType::toLocalDateTime, CreatedAtProjectCursor::new),
            project -> new CreatedAtProjectCursor(project.getCreatedAt(), project.getId())
    ),

    VIEWS("views",
            cursor -> parseCursor(cursor, ProjectSortType::toInt, ViewProjectCursor::new),
            project -> new ViewProjectCursor(project.getViews(), project.getId())
    ),

    LOVES("loves",
            cursor -> parseCursor(cursor, ProjectSortType::toInt, LoveProjectCursor::new),
            project -> new LoveProjectCursor(project.getLoveCount(), project.getId())
    );

    private static final String COUNT_BASED_CURSOR_REGEX = "[0-9]+_[0-9]+";
    private static final String CREATED_AT_CURSOR_REGEX = "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}_[0-9]+$";

    private final String sortType;
    private final Function<String, ProjectCursor<?>> cursorFactory;
    private final Function<Project, ProjectCursor<?>> projectToCursorFactory;

    ProjectSortType(String sortType,
                    Function<String, ProjectCursor<?>> cursorFactory,
                    Function<Project, ProjectCursor<?>> projectToCursorFactory
    ) {
        this.sortType = sortType;
        this.cursorFactory = cursorFactory;
        this.projectToCursorFactory = projectToCursorFactory;
    }

    public static ProjectSortType from(String sortType) {
        return Arrays.stream(ProjectSortType.values())
                .filter(sortBy -> sortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }

    public ProjectCursor<?> toCursor(String cursor) {
        return cursorFactory.apply(cursor);
    }

    public ProjectCursor<?> toCursor(Project project) {
        return projectToCursorFactory.apply(project);
    }

    private static <T> ProjectCursor<?> parseCursor(
            String cursor,
            Function<String, T> valueParser,
            BiFunction<T, Long, ProjectCursor<?>> constructor
    ) {

        if (isCursorEmpty(cursor)) {
            return null;
        }

        String[] valueAndId = splitAndValidateCursor(cursor);

        T sortValue = valueParser.apply(valueAndId[0]);
        Long lastId = toLong(valueAndId[1]);

        return constructor.apply(sortValue, lastId);
    }

    private static String[] splitAndValidateCursor(String cursor) {
        if (!cursor.matches(COUNT_BASED_CURSOR_REGEX) && !cursor.matches(CREATED_AT_CURSOR_REGEX)) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }

        return cursor.split("_");
    }

    private static Integer toInt(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static Long toLong(String value) {
        try {
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static LocalDateTime toLocalDateTime(String value) {
        try {
            return LocalDateTime.parse(value);
        } catch (DateTimeParseException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static boolean isCursorEmpty(String cursor) {
        return cursor == null || cursor.isEmpty();
    }
}
