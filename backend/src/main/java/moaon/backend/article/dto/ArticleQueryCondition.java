package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.global.cursor.ArticleCursor;

public record ArticleQueryCondition(
        String search,
        String categoryName,
        List<String> techStackNames,
        ArticleSortType sortBy,
        int limit,
        ArticleCursor<?> articleCursor
) {

    public static ArticleQueryCondition from(
            String search,
            String categoryName,
            List<String> techStackNames,
            String sortType,
            int limit,
            String cursor
    ) {
        ArticleSortType sortBy = ArticleSortType.from(sortType);
        return new ArticleQueryCondition(
                search,
                categoryName,
                techStackNames,
                sortBy,
                limit,
                sortBy.toCursor(cursor)
        );
    }
}
