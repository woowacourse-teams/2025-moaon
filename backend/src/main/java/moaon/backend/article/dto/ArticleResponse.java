package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.Article;

public record ArticleResponse(
        List<Content> contents,
        int totalCount,
        boolean hasNext,
        String nextCursor
) {

    public static ArticleResponse from(
            List<Article> articles,
            Long totalCount,
            boolean hasNext,
            String nextCursor
    ) {
        return new ArticleResponse(
                Content.from(articles),
                totalCount.intValue(),
                hasNext,
                nextCursor
        );
    }
}
