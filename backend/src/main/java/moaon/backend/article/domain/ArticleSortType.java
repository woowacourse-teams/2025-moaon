package moaon.backend.article.domain;

import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cursor.ClickArticleCursor;
import moaon.backend.global.cursor.CreatedAtArticleCursor;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.parser.CursorParser;
import moaon.backend.global.parser.IntegerParser;
import moaon.backend.global.parser.LocalDateTimeParser;
import moaon.backend.global.parser.LongParser;

@RequiredArgsConstructor
public enum ArticleSortType {

    CREATED_AT("createdAt",
            cursor -> parseCursor(cursor, LocalDateTimeParser::toLocalDateTime, CreatedAtArticleCursor::new),
            article -> new CreatedAtArticleCursor(article.getCreatedAt(), article.getId())
    ),
    CLICKS("clicks",
            cursor -> parseCursor(cursor, IntegerParser::toInt, ClickArticleCursor::new),
            article -> new ClickArticleCursor(article.getClicks(), article.getId())
    );

    private final String sortType;
    private final Function<String, Cursor<?>> cursorFactory;
    private final Function<Article, Cursor<?>> articleToCursorFactory;

    public static ArticleSortType from(String sortType) {
        return Arrays.stream(ArticleSortType.values())
                .filter(articleSortBy -> articleSortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }

    public Cursor<?> toCursor(String cursor) {
        return cursorFactory.apply(cursor);
    }

    public Cursor<?> toCursor(Article article) {
        return articleToCursorFactory.apply(article);
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
