package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.Article;

public record ArticleResponse(
        List<ArticleContent> articleContents,
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
                ArticleContent.from(articles),
                totalCount.intValue(),
                hasNext,
                nextCursor
        );
    }
}
