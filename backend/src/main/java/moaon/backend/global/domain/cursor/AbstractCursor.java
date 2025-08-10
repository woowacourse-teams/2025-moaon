package moaon.backend.global.domain.cursor;

import lombok.RequiredArgsConstructor;
import lombok.ToString;
import moaon.backend.global.domain.cursor.formatter.CursorFormatter;

@RequiredArgsConstructor
@ToString
public abstract class AbstractCursor<T extends Comparable<? super T>> implements Cursor<T> {

    protected final T sortValue;
    protected final Long lastId;

    public AbstractCursor(String rawCursor) {
        if (rawCursor == null) {
            this.sortValue = null;
            this.lastId = null;
            return;
        }

        this.sortValue = formatter().parseSortValue(rawCursor);
        this.lastId = formatter().parseLastId(rawCursor);
    }

    @Override
    public final T getSortValue() {
        return sortValue;
    }

    @Override
    public final Long getLastId() {
        return lastId;
    }

    @Override
    public String getNextCursor() {
        return formatter().format(sortValue, lastId);
    }

    protected abstract CursorFormatter<T> formatter();
}
