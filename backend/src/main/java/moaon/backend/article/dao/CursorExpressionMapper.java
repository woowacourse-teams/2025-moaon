package moaon.backend.article.dao;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberTemplate;
import jakarta.annotation.Nullable;
import java.time.LocalDateTime;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.repository.db.ArticleFullTextSearchHQLFunction;
import moaon.backend.global.domain.SearchKeyword;

public class CursorExpressionMapper {

    private CursorExpressionMapper() {
    }

    public static BooleanExpression toWhereClause(
            ArticleCursor cursor,
            ArticleSortType sortType,
            @Nullable SearchKeyword searchKeyword
    ) {
        if (ArticleSortType.CREATED_AT == sortType) {
            LocalDateTime sortValue = cursor.getSortValueAsLocalDateTime();

            return article.createdAt.lt(sortValue)
                    .or(article.createdAt.eq(sortValue).and(article.id.lt(cursor.getLastId())));
        }

        if (ArticleSortType.CLICKS == sortType) {
            Integer sortValue = cursor.getSortValueAsInt();
            return article.clicks.lt(sortValue)
                    .or(article.clicks.eq(sortValue).and(article.id.lt(cursor.getLastId())));
        }

        if (ArticleSortType.RELEVANCE == sortType && searchKeyword != null && searchKeyword.hasValue()) {
            Double sortValue = cursor.getSortValueAsDouble();
            NumberTemplate<Double> score = ArticleFullTextSearchHQLFunction.scoreReference(searchKeyword);
            return score.lt(sortValue)
                    .or(score.eq(sortValue).and(article.id.lt(cursor.getLastId())));
        }

        return null;
    }
}
