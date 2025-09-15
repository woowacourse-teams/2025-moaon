package moaon.backend.global.cursor;

import com.querydsl.core.types.dsl.BooleanExpression;

public interface Cursor<T extends Comparable<? super T>> {

    T getSortValue();

    Long getLastId();

    String getNextCursor();

    BooleanExpression getCursorExpression();
}
