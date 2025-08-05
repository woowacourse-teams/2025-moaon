package moaon.backend.global.cursor;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectSortBy;

public class CursorParser {

    private static final String COUNT_BASED_CURSOR_REGEX = "[0-9]+_[0-9]+";
    private static final String CREATED_AT_CURSOR_REGEX = "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}_[0-9]+$";

    public static ArticleCursor<?> toCursor(String cursor, ArticleSortBy articleSortBy) {
        if (cursor == null || cursor.isEmpty()) {
            return null;
        }

        validateFormat(cursor);

        String[] valueAndId = cursor.split("_");

        String value = valueAndId[0];
        String id = valueAndId[1];

        if (articleSortBy == ArticleSortBy.CREATED_AT) {
            return toCreatedAtCursor(value, id);
        }

        return toClickCursor(value, id);
    }

    public static ProjectCursor<?> toCursor(String cursor, ProjectSortBy sortType) {
        if (cursor == null || cursor.isEmpty()) {
            return null;
        }

        validateFormat(cursor);

        String[] valueAndId = cursor.split("_");

        String value = valueAndId[0];
        String id = valueAndId[1];

        if (sortType == ProjectSortBy.CREATED_AT) {
            return toCreatedAtProjectCursor(value, id);
        }

        if (sortType == ProjectSortBy.VIEWS) {
            return toViewProjectCursor(value, id);
        }

        return toLoveProjectCursor(value, id);
    }

    public static ArticleCursor<?> toCursor(Article article, ArticleSortBy articleSortBy) {
        if (articleSortBy == ArticleSortBy.CREATED_AT) {
            return new CreatedAtArticleCursor(article.getCreatedAt(), article.getId());
        }

        return new ClickArticleCursor(article.getClicks(), article.getId());
    }

    public static ProjectCursor<?> toCursor(Project project, ProjectSortBy projectSortBy) {
        if (projectSortBy == ProjectSortBy.CREATED_AT) {
            return new CreatedAtProjectCursor(project.getCreatedAt(), project.getId());
        }

        if (projectSortBy == ProjectSortBy.VIEWS) {
            return new ViewProjectCursor(project.getViews(), project.getId());
        }

        return new LoveProjectCursor(project.getLoveCount(), project.getId());
    }

    private static LoveProjectCursor toLoveProjectCursor(String value, String id) {
        try {
            int loves = Integer.parseInt(value);
            Long lastId = Long.parseLong(id);

            return new LoveProjectCursor(loves, lastId);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static ViewProjectCursor toViewProjectCursor(String value, String id) {
        try {
            int views = Integer.parseInt(value);
            Long lastId = Long.parseLong(id);

            return new ViewProjectCursor(views, lastId);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static CreatedAtProjectCursor toCreatedAtProjectCursor(String value, String id) {
        try {
            LocalDateTime lastCreatedAt = LocalDateTime.parse(value);
            Long lastId = Long.parseLong(id);

            return new CreatedAtProjectCursor(lastCreatedAt, lastId);
        } catch (NumberFormatException | DateTimeParseException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static ClickArticleCursor toClickCursor(String value, String id) {
        try {
            int clicks = Integer.parseInt(value);
            Long lastId = Long.parseLong(id);

            return new ClickArticleCursor(clicks, lastId);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static CreatedAtArticleCursor toCreatedAtCursor(String value, String id) {
        try {
            LocalDateTime lastCreatedAt = LocalDateTime.parse(value);
            Long lastId = Long.parseLong(id);

            return new CreatedAtArticleCursor(lastCreatedAt, lastId);
        } catch (NumberFormatException | DateTimeParseException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static void validateFormat(String cursor) {
        if (!cursor.matches(COUNT_BASED_CURSOR_REGEX) && !cursor.matches(CREATED_AT_CURSOR_REGEX)) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }
}
