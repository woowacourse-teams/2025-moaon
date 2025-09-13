package moaon.backend.project.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.article.dto.ArticleSectorCount;

public record ProjectArticleResponse(
        List<ArticleSectorCount> count,
        List<ArticleDetailResponse> data
) {

    public static ProjectArticleResponse of(
            List<Article> articles,
            Map<Sector, Long> articleCountBySector
    ) {
        List<ArticleDetailResponse> data = ArticleDetailResponse.from(articles);
        List<ArticleSectorCount> sectorCounts = createSectorCounts(articleCountBySector);

        return new ProjectArticleResponse(sectorCounts, data);
    }

    private static List<ArticleSectorCount> createSectorCounts(Map<Sector, Long> articleCountBySector) {
        List<ArticleSectorCount> sectorCounts = new ArrayList<>();

        articleCountBySector.entrySet().stream()
                .map(entry -> ArticleSectorCount.of(entry.getKey(), entry.getValue()))
                .forEach(sectorCounts::add);

        long totalCount = articleCountBySector.values().stream()
                .mapToLong(Long::longValue)
                .sum();
        sectorCounts.add(ArticleSectorCount.all(totalCount));

        return sectorCounts;
    }
}
