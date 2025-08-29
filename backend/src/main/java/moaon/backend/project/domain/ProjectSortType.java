package moaon.backend.project.domain;

import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import moaon.backend.global.cursor.CreatedAtProjectCursor;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.cursor.LoveProjectCursor;
import moaon.backend.global.cursor.ViewProjectCursor;
import moaon.backend.global.parser.CursorParser;
import moaon.backend.global.parser.IntegerParser;
import moaon.backend.global.parser.LocalDateTimeParser;
import moaon.backend.global.parser.LongParser;

public enum ProjectSortType {

    CREATED_AT("createdAt",
            cursor -> parseCursor(cursor, LocalDateTimeParser::toLocalDateTime, CreatedAtProjectCursor::new),
            project -> new CreatedAtProjectCursor(project.getCreatedAt(), project.getId())
    ),

    VIEWS("views",
            cursor -> parseCursor(cursor, IntegerParser::toInt, ViewProjectCursor::new),
            project -> new ViewProjectCursor(project.getViews(), project.getId())
    ),

    LOVES("loves",
            cursor -> parseCursor(cursor, IntegerParser::toInt, LoveProjectCursor::new),
            project -> new LoveProjectCursor(project.getLoveCount(), project.getId())
    );

    private final String sortType;
    private final Function<String, Cursor<?>> cursorFactory;
    private final Function<Project, Cursor<?>> projectToCursorFactory;

    ProjectSortType(
            String sortType,
            Function<String, Cursor<?>> cursorFactory,
            Function<Project, Cursor<?>> projectToCursorFactory
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

    public Cursor<?> toCursor(String cursor) {
        return cursorFactory.apply(cursor);
    }

    public Cursor<?> toCursor(Project project) {
        return projectToCursorFactory.apply(project);
    }

    private static <T> Cursor<?> parseCursor(
            String cursor,
            Function<String, T> valueParser,
            BiFunction<T, Long, Cursor<?>> constructor
    ) {

        if (CursorParser.isCursorEmpty(cursor)) {
            return null;
        }

        String[] valueAndId = CursorParser.splitAndValidateFormat(cursor);

        T sortValue = valueParser.apply(valueAndId[0]);
        Long lastId = LongParser.toLong(valueAndId[1]);

        return constructor.apply(sortValue, lastId);
    }
}
