package moaon.backend.global.cursor;

import com.querydsl.core.BooleanBuilder;

public class NullCursor<T extends Comparable<? super T>> implements Cursor<T> {

    @Override
    public T getSortValue() {
        return null;
    }

    @Override
    public Long getLastId() {
        return null;
    }

    @Override
    public String getNextCursor() {
        return "";
    }

    @Override
    public void applyCursor(BooleanBuilder whereBuilder) {

    }
}
