package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.repository.ArticleSearchResult;

public record ArticleResponse(
        List<ArticleData> contents,
        int totalCount,
        boolean hasNext,
        String nextCursor
) {

    public static ArticleResponse from(ArticleSearchResult searchResult) {
        return new ArticleResponse(
                ArticleData.from(searchResult.getArticles()),
                (int) searchResult.getTotalCount(),
                searchResult.hasNext(),
                nextCursorToString(searchResult.getNextCursor())
        );
    }

    private static String nextCursorToString(ArticleCursor nextCursor) {
        if (nextCursor == null) {
            return null;
        }
        return nextCursor.toString();
    }
}
