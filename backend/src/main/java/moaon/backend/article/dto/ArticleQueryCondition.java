package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;

public record ArticleQueryCondition(
        SearchKeyword search,
        String categoryName,
        List<String> techStackNames,
        ArticleSortType sortBy,
        int limit,
        Cursor<?> articleCursor
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
                new SearchKeyword(search),
                categoryName,
                techStackNames,
                sortBy,
                limit,
                sortBy.toCursor(cursor)
        );
    }
}
