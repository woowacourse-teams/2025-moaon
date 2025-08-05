package moaon.backend.article.dto;

import java.time.LocalDateTime;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortBy;

public class CursorParser {

    public static Cursor<?> toCursor(String cursor, ArticleSortBy articleSortBy) {
        String[] valueAndId = cursor.split("_");

        String value = valueAndId[0];
        String id = valueAndId[1];

        if (articleSortBy == ArticleSortBy.CREATED_AT) {

            LocalDateTime lastCreatedAt = LocalDateTime.parse(value);
            Long lastId = Long.parseLong(id);

            return new CreatedAtCursor(lastCreatedAt, lastId);
        }

        int clicks = Integer.parseInt(value);
        Long lastId = Long.parseLong(id);

        return new ClickCursor(clicks, lastId);
    }

    public static Cursor<?> toCursor(Article article, ArticleSortBy articleSortBy) {
        if (articleSortBy == ArticleSortBy.CREATED_AT) {
            return new CreatedAtCursor(article.getCreatedAt(), article.getId());
        }

        return new ClickCursor(article.getClicks(), article.getId());
    }
}
