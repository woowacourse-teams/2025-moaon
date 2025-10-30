package moaon.backend.article.api.crawl.dto;

import java.net.URL;

public record CrawlRequest(
        URL url
) {
}
