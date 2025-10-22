package moaon.backend.article.domain;

import java.util.Arrays;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cursor.ClickArticleCursor;
import moaon.backend.global.cursor.CreatedAtArticleCursor;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.parser.CursorParser;
import moaon.backend.global.parser.IntegerParser;
import moaon.backend.global.parser.LocalDateTimeParser;

@RequiredArgsConstructor
public enum ArticleSortType {

    CREATED_AT(
            "createdAt",
            cursor -> CursorParser.toCursor(cursor, new LocalDateTimeParser(), CreatedAtArticleCursor::new),
            article -> new CreatedAtArticleCursor(article.getCreatedAt(), article.getId())
    ),
    CLICKS(
            "clicks",
            cursor -> CursorParser.toCursor(cursor, new IntegerParser(), ClickArticleCursor::new),
            article -> new ClickArticleCursor(article.getClicks(), article.getId())
    ),
    RELEVANCE("relevance",
            string -> {
                throw new UnsupportedOperationException("아직 ES에서만 사용중입니다.");
            },
            article -> {
                throw new UnsupportedOperationException("아직 ES에서만 사용중입니다.");
            }
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
}
