package moaon.backend.article.domain;

import java.util.Arrays;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.cursor.ClickArticleCursor;
import moaon.backend.article.domain.cursor.CreatedAtArticleCursor;
import moaon.backend.global.domain.cursor.Cursor;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
public enum ArticleSortType {

    CREATED_AT("createdAt", CreatedAtArticleCursor::new, CreatedAtArticleCursor::new),

    CLICKS("clicks", ClickArticleCursor::new, ClickArticleCursor::new);

    private final String sortType;
    private final Function<String, Cursor<?>> stringToCursorFunction;
    private final Function<Article, Cursor<?>> ArticleToCursorFunction;

    public Cursor<?> toCursor(String cursor) {
        if (!StringUtils.hasText(cursor)) {
            return null;
        }

        return stringToCursorFunction.apply(cursor);
    }

    public Cursor<?> toCursor(Article Article) {
        return ArticleToCursorFunction.apply(Article);
    }

    public static ArticleSortType from(String sortType) {
        return Arrays.stream(ArticleSortType.values())
                .filter(sortBy -> sortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }
}
