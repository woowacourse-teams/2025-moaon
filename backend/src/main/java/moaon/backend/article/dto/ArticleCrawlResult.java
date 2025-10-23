package moaon.backend.article.dto;

public record ArticleCrawlResult(
        String title,
        String summary,
        String content
) {

    public static ArticleCrawlResult withoutSummary(FinderCrawlResult result) {
        return new ArticleCrawlResult(result.title(), "", result.content());
    }
}
