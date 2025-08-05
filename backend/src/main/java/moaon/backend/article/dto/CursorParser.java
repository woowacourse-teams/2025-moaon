package moaon.backend.article.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class CursorParser {

    private static final String CLICK_CURSOR_REGEX = "[0-9]+_[0-9]+";
    private static final String CREATED_AT_CURSOR_REGEX = "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}_[0-9]+$";

    public static Cursor<?> toCursor(String cursor, ArticleSortBy articleSortBy) {
        if (cursor == null || cursor.isEmpty()) {
            return null;
        }

        if (!cursor.matches(CLICK_CURSOR_REGEX) && !cursor.matches(CREATED_AT_CURSOR_REGEX)) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }

        String[] valueAndId = cursor.split("_");

        String value = valueAndId[0];
        String id = valueAndId[1];

        if (articleSortBy == ArticleSortBy.CREATED_AT) {
            return toCreatedAtCursor(value, id);
        }

        return toClickCursor(value, id);
    }

    public static Cursor<?> toCursor(Article article, ArticleSortBy articleSortBy) {
        if (articleSortBy == ArticleSortBy.CREATED_AT) {
            return new CreatedAtCursor(article.getCreatedAt(), article.getId());
        }

        return new ClickCursor(article.getClicks(), article.getId());
    }

    private static ClickCursor toClickCursor(String value, String id) {
        try {
            int clicks = Integer.parseInt(value);
            Long lastId = Long.parseLong(id);

            return new ClickCursor(clicks, lastId);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    private static CreatedAtCursor toCreatedAtCursor(String value, String id) {
        try {
            LocalDateTime lastCreatedAt = LocalDateTime.parse(value);
            Long lastId = Long.parseLong(id);

            return new CreatedAtCursor(lastCreatedAt, lastId);
        } catch (NumberFormatException | DateTimeParseException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }
}
