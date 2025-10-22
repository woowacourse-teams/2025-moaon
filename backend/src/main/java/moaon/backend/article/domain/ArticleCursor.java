package moaon.backend.article.domain;

import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleCursor {

    private final Object sortValue;
    private final long lastId;

    public ArticleCursor(Object sortValue, long lastId) {
        this.sortValue = sortValue;
        this.lastId = lastId;
    }

    public ArticleCursor(String rawCursor, ArticleSortType sortType) {
        String[] split = rawCursor.split("_");
        this.lastId = Long.parseLong(split[0]);
        this.sortValue = determineSortValue(split[1], sortType);
    }

    public ArticleCursor(Article article, ArticleSortType sortType) {
        this.sortValue = determineSortValue(article, sortType);
        this.lastId = article.getId();
    }

    public String asString() {
        return sortValue + "_" + lastId;
    }

    private Object determineSortValue(String rawSortValue, ArticleSortType sortType) {
        if (ArticleSortType.CREATED_AT == sortType) {
            return LocalDateTime.parse(rawSortValue);
        }

        if (ArticleSortType.CLICKS == sortType) {
            return Integer.parseInt(rawSortValue);
        }

        throw new IllegalArgumentException("Unknown SortType : " + sortType);
    }

    private Object determineSortValue(Article article, ArticleSortType sortType) {
        if (ArticleSortType.CREATED_AT == sortType) {
            return article.getCreatedAt();
        }

        if (ArticleSortType.CLICKS == sortType) {
            return article.getClicks();
        }

        throw new IllegalArgumentException("Unknown SortType : " + sortType);
    }
}
