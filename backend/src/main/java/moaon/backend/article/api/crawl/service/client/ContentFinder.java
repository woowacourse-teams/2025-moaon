package moaon.backend.article.api.crawl.service.client;

import java.net.URL;
import moaon.backend.article.api.crawl.dto.FinderCrawlResult;

public abstract class ContentFinder {

    public abstract FinderCrawlResult crawl(URL url);

    public abstract boolean canHandle(URL url);
}
