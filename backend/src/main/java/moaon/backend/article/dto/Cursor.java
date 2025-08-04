package moaon.backend.article.dto;

import com.querydsl.core.BooleanBuilder;

public interface Cursor<T extends Comparable<? super T>> {

    T getSortValue();

    Long getLastId();

    String getNextCursor();

    void applyCursor(
            ArticleQueryCondition queryCondition,
            BooleanBuilder whereBuilder
    );
}
