package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.cursor.CursorParser;

public record ArticleQueryCondition(
        String search,
        String categoryName,
        List<String> techStackNames,
        ArticleSortBy sortBy,
        int limit,
        Cursor<?> cursor
) {

    public static ArticleQueryCondition from(
            String search,
            String categoryName,
            List<String> techStackNames,
            String sortType,
            int limit,
            String cursor
    ) {
        ArticleSortBy sortBy = ArticleSortBy.from(sortType);
        return new ArticleQueryCondition(
                search,
                categoryName,
                techStackNames,
                sortBy,
                limit,
                CursorParser.toCursor(cursor, sortBy)
        );
    }
}
