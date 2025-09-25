package moaon.backend.es;

import java.util.List;
import lombok.Getter;

@Getter
public class ESCursor {

    private final List<Object> sortValues;

    public ESCursor(final List<Object> sortValues) {
        final var sortValue = sortValues.get(0);
        final var lastId = sortValues.get(1);
        this.sortValues = List.of(sortValue, lastId);
    }

    public ESCursor(final String rawCursor) {
        if (rawCursor == null || rawCursor.isEmpty()) {
            this.sortValues = List.of();
            return;
        }

        final var split = rawCursor.split("_");
        this.sortValues = List.of(Long.parseLong(split[0]), split[1]);
    }

    public boolean isEmpty() {
        return sortValues.size() < 2;
    }

    public String getNextCursor() {
        return sortValues.get(0) + "_" + sortValues.get(1);
    }
}
