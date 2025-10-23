package moaon.backend.article.dao;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.types.dsl.BooleanExpression;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;

public class CursorExpressionMapper {

    private static final DateTimeFormatter CREATED_AT_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public static BooleanExpression toWhereClause(ArticleCursor cursor, ArticleSortType sortType) {
        if (ArticleSortType.CREATED_AT == sortType) {
            LocalDateTime sortValue = cursor.getSortValueAs(
                    obj -> {
                        try {
                            return LocalDateTime.parse(obj.toString(), CREATED_AT_FORMATTER);
                        } catch (DateTimeParseException e) {
                            return Instant.ofEpochMilli(Long.parseLong(obj.toString())).atOffset(ZoneOffset.UTC)
                                    .toLocalDateTime();
                        }
                    }
            );

            return article.createdAt.lt(sortValue)
                    .or(article.createdAt.eq(sortValue).and(article.id.lt(cursor.getLastIdAsLong())));
        }

        if (ArticleSortType.CLICKS == sortType) {
            Integer sortValue = cursor.getSortValueAs(obj -> Integer.parseInt(obj.toString()));
            return article.clicks.lt(sortValue)
                    .or(article.clicks.eq(sortValue).and(article.id.lt(cursor.getLastIdAsLong())));
        }

        return null;
    }
}
