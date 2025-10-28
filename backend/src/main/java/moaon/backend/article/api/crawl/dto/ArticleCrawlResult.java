package moaon.backend.article.api.crawl.dto;

public record ArticleCrawlResult(
        String title,
        String summary,
        String content,
        boolean isSucceed
) {

    public static ArticleCrawlResult success(String title, String summary, String content) {
        return new ArticleCrawlResult(title, summary, content, true);
    }

    public static ArticleCrawlResult withoutSummary(FinderCrawlResult result) {
        return new ArticleCrawlResult(result.title(), "", result.content(), false);
    }
}
