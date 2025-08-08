package moaon.backend.article.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cursor.ArticleCursor;
import moaon.backend.global.cursor.ClickArticleCursor;
import moaon.backend.global.cursor.CreatedAtArticleCursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

@RequiredArgsConstructor
public enum ArticleSortType {

    CREATED_AT("createdAt",
            cursor -> parseCursor(cursor, ArticleSortType::toLocalDateTime, CreatedAtArticleCursor::new),
            article -> new CreatedAtArticleCursor(article.getCreatedAt(), article.getId())
    ),
    CLICKS("clicks",
            cursor -> parseCursor(cursor, ArticleSortType::toInt, ClickArticleCursor::new),
            article -> new ClickArticleCursor(article.getClicks(), article.getId())
    );

    private final String sortType;
    private final Function<String, ArticleCursor<?>> cursorFactory;
    private final Function<Article, ArticleCursor<?>> articleToCursorFactory;

    private static final String COUNT_BASED_CURSOR_REGEX = "[0-9]+_[0-9]+";
    private static final String CREATED_AT_CURSOR_REGEX = "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}_[0-9]+$";

    public static ArticleSortType from(String sortType) {
        return Arrays.stream(ArticleSortType.values())
                .filter(articleSortBy -> articleSortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }

    public ArticleCursor<?> toCursor(String cursor) {
        return cursorFactory.apply(cursor);
    }

    public ArticleCursor<?> toCursor(Article article) {
        if (this == CREATED_AT) {
            return new CreatedAtArticleCursor(article.getCreatedAt(), article.getId());
        }

        return new ClickArticleCursor(article.getClicks(), article.getId());
    }

    private static <T> ArticleCursor<?> parseCursor(
            String cursor,
            Function<String, T> valueParser,
            BiFunction<T, Long, ArticleCursor<?>> constructor
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
