package moaon.backend.global.domain.cursor;

public interface Cursor<T extends Comparable<? super T>> {

    T getSortValue();

    Long getLastId();

    String getNextCursor();
}
