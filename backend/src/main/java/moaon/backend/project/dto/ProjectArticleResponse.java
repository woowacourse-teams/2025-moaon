package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.article.dto.ArticleSectorCount;

public record ProjectArticleResponse(
        List<ArticleSectorCount> count,
        List<ArticleDetailResponse> data
) {

    public static ProjectArticleResponse of(
            List<ArticleSectorCount> count,
            List<ArticleDetailResponse> data
    ) {
        return new ProjectArticleResponse(count, data);
    }
}
