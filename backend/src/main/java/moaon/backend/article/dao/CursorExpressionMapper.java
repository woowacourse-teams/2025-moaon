package moaon.backend.article.dao;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.types.dsl.BooleanExpression;
import java.time.LocalDateTime;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;

public class CursorExpressionMapper {

    public static BooleanExpression toWhereClause(ArticleCursor cursor, ArticleSortType sortType) {
        if (ArticleSortType.CREATED_AT == sortType) {
            LocalDateTime sortValue = (LocalDateTime) cursor.getSortValue();
            return article.createdAt.lt(sortValue)
                    .or(article.createdAt.eq(sortValue).and(article.id.lt(cursor.getLastId())));
        }

        if (ArticleSortType.CLICKS == sortType) {
            Integer sortValue = (Integer) cursor.getSortValue();
            return article.clicks.lt(sortValue)
                    .or(article.clicks.eq(sortValue).and(article.id.lt(cursor.getLastId())));
        }

        return null;
    }
}
