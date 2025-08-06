package moaon.backend.global.cursor;

import com.querydsl.core.BooleanBuilder;
import moaon.backend.article.dto.ArticleQueryCondition;

public interface ArticleCursor<T extends Comparable<? super T>> {

    T getSortValue();

    Long getLastId();

    String getNextCursor();

    void applyCursor(
            ArticleQueryCondition queryCondition,
            BooleanBuilder whereBuilder
    );
}
