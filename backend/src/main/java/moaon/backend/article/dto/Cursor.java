package moaon.backend.article.dto;

public interface Cursor<T extends Comparable<? super T>> {

    T getSortValue();

    Long getLastId();

    String getNextCursor();
}
