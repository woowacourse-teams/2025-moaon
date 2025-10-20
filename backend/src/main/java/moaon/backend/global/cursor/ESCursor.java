package moaon.backend.global.cursor;

import java.util.List;
import lombok.Getter;
import moaon.backend.article.domain.ArticleSortType;

@Getter
public class ESCursor {

    private final List<Object> sortValues;

    public ESCursor(List<Object> sortValues) {
        final var sortValue = sortValues.get(0);
        final var lastId = sortValues.get(1);
        this.sortValues = List.of(sortValue, lastId);
    }

    public ESCursor(String rawCursor, ArticleSortType sortType) {
        if (rawCursor == null || rawCursor.isEmpty()) {
            this.sortValues = List.of();
            return;
        }

        final var split = rawCursor.split("_");
        switch (sortType) {
            case CREATED_AT -> this.sortValues = List.of(Long.parseLong(split[0]), split[1]);
            case CLICKS -> this.sortValues = List.of(Integer.parseInt(split[0]), split[1]);
            case RELEVANCE -> this.sortValues = List.of(Double.parseDouble(split[0]), split[1]);
            default -> this.sortValues = List.of(split[0], split[1]);
        }
    }

    public boolean isEmpty() {
        return sortValues.size() < 2;
    }

    public String getNextCursor() {
        return sortValues.get(0) + "_" + sortValues.get(1);
    }
}
