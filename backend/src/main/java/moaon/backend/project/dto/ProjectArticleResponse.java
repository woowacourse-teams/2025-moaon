package moaon.backend.project.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.article.dto.ArticleSectorCount;

public record ProjectArticleResponse(
        List<ArticleSectorCount> counts,
        List<ArticleDetailResponse> articles
) {

    public static ProjectArticleResponse of(
            List<Article> articles,
            Map<Sector, Long> articleCountBySector
    ) {
        List<ArticleDetailResponse> data = ArticleDetailResponse.from(articles);
        List<ArticleSectorCount> articleSectorCounts = new ArrayList<>(articleCountBySector.entrySet().stream()
                .map(entry -> ArticleSectorCount.of(entry.getKey(), entry.getValue()))
                .toList());
        articleSectorCounts.add(ArticleSectorCount.all(articleCountBySector));
        return new ProjectArticleResponse(articleSectorCounts, data);
    }
}
