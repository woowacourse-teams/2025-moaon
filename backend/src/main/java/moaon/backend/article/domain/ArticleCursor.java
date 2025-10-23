package moaon.backend.article.domain;

import java.util.function.Function;
import lombok.Getter;

@Getter
public class ArticleCursor {

    private final Object sortValue;
    private final Object lastId;

    public ArticleCursor(Object sortValue, Object lastId) {
        this.sortValue = sortValue;
        this.lastId = lastId;
    }

    public ArticleCursor(String rawCursor) {
        String[] split = rawCursor.split("_");
        this.sortValue = split[0];
        this.lastId = split[1];
    }

    public ArticleCursor(Article article, ArticleSortType sortType) {
        this.sortValue = determineSortValue(article, sortType);
        this.lastId = article.getId();
    }

    public String asString() {
        return sortValue + "_" + lastId;
    }

    public <T> T getSortValueAs(Function<Object, T> mapper) {
        return mapper.apply(sortValue);
    }

    public Long getLastIdAsLong() {
        return Long.parseLong(lastId.toString());
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
