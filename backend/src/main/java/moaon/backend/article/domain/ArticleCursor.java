package moaon.backend.article.domain;

import java.time.LocalDateTime;
import java.util.function.Function;
import lombok.Getter;

@Getter
public class ArticleCursor {

    private final Object sortValue;
    private final Long lastId;

    public ArticleCursor(Object sortValue, Long lastId) {
        this.sortValue = sortValue;
        this.lastId = lastId;
    }

    public ArticleCursor(String rawCursor) {
        String[] split = rawCursor.split("_");
        this.sortValue = split[0];
        this.lastId = Long.parseLong(split[1]);
    }

    public <T> T getSortValueAs(Function<Object, T> mapper) {
        return mapper.apply(sortValue);
    }

    public LocalDateTime getSortValueAsLocalDateTime() {
        return LocalDateTime.parse(sortValue.toString());
    }

    public int getSortValueAsInt() {
        return Integer.parseInt(sortValue.toString());
    }

    public double getSortValueAsDouble() {
        return Double.parseDouble(sortValue.toString());
    }

    public long getSortValueAsLong() {
        return Long.parseLong(sortValue.toString());
    }

    @Override
    public String toString() {
        return sortValue + "_" + lastId;
    }
}
