package moaon.backend.article.api.crawl.service.client;

import java.net.URL;
import moaon.backend.article.api.crawl.dto.FinderCrawlResult;

public abstract class ContentFinder {

    protected final int connectionTimeoutSeconds;
    protected final int readTimeoutSeconds;

    public ContentFinder(int connectionTimeoutSeconds, int readTimeoutSeconds) {
        this.connectionTimeoutSeconds = connectionTimeoutSeconds;
        this.readTimeoutSeconds = readTimeoutSeconds;
    }

    public abstract FinderCrawlResult crawl(URL url);

    public abstract boolean canHandle(URL url);
}
