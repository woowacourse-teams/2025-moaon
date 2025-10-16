package moaon.backend.article.dto;

public record ArticleCrawlResult(
        String title,
        String summary,
        String content
) {
}
