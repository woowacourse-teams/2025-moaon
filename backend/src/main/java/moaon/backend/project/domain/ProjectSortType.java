package moaon.backend.project.domain;

import java.util.Arrays;
import java.util.function.Function;
import moaon.backend.global.cursor.CreatedAtProjectCursor;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.cursor.LoveProjectCursor;
import moaon.backend.global.cursor.ViewProjectCursor;
import moaon.backend.global.parser.CursorParser;
import moaon.backend.global.parser.IntegerParser;
import moaon.backend.global.parser.LocalDateTimeParser;

public enum ProjectSortType {

    CREATED_AT("createdAt",
            cursor -> CursorParser.toCursor(cursor, new LocalDateTimeParser(), CreatedAtProjectCursor::new),
            project -> new CreatedAtProjectCursor(project.getCreatedAt(), project.getId())
    ),

    VIEWS("views",
            cursor -> CursorParser.toCursor(cursor, new IntegerParser(), ViewProjectCursor::new),
            project -> new ViewProjectCursor(project.getViews(), project.getId())
    ),

    LOVES("loves",
            cursor -> CursorParser.toCursor(cursor, new IntegerParser(), LoveProjectCursor::new),
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
}
