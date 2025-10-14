package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.global.cursor.Cursor;

public record ArticleResponse(
        List<ArticleData> contents,
        int totalCount,
        boolean hasNext,
        String nextCursor
) {

    public static ArticleResponse from(
            List<Article> articles,
            Long totalCount,
            boolean hasNext,
            Cursor<?> nextCursor
    ) {
        return new ArticleResponse(
                ArticleData.from(articles),
                totalCount.intValue(),
                hasNext,
                extractNextCursor(nextCursor)
        );
    }

    public static ArticleResponse from(
            List<Article> articles,
            Long totalCount,
            boolean hasNext,
            String nextCursor
    ) {
        return new ArticleResponse(
                ArticleData.from(articles),
                totalCount.intValue(),
                hasNext,
                nextCursor
        );
    }

    public static ArticleResponse withoutNextCursor(
            List<Article> articles,
            Long totalCount,
            boolean hasNext
    ) {
        return new ArticleResponse(
                ArticleData.from(articles),
                totalCount.intValue(),
                hasNext,
                null
        );
    }

    private static String extractNextCursor(Cursor<?> nextCursor) {
        if (nextCursor == null) {
            return null;
        }
        return nextCursor.getNextCursor();
    }
}
