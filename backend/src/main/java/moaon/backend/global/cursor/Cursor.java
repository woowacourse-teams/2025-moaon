package moaon.backend.global.cursor;

import com.querydsl.core.BooleanBuilder;

public interface Cursor<T extends Comparable<? super T>> {

    T getSortValue();

    Long getLastId();

    String getNextCursor();

    void applyCursor(BooleanBuilder booleanBuilder);
}
