package moaon.backend.article.dao;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.types.dsl.BooleanExpression;
import java.time.LocalDateTime;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.global.cursor.Cursor;

public class CursorExpressionMapper {

    public static BooleanExpression toWhereClause(Cursor<?> cursor, ArticleSortType sortType) {
        if (ArticleSortType.CREATED_AT == sortType) {
            LocalDateTime sortValue = (LocalDateTime) cursor.getSortValue();
            return project.createdAt.lt(sortValue)
                    .or(project.createdAt.eq(sortValue).and(project.id.lt(cursor.getLastId())));
        }

        if (ArticleSortType.CLICKS == sortType) {
            Integer sortValue = (Integer) cursor.getSortValue();
            return project.views.lt(sortValue)
                    .or(project.views.eq(sortValue).and(project.id.lt(cursor.getLastId())));
        }

        return null;
    }
}
