package moaon.backend.article.domain;

import java.net.URL;
import moaon.backend.article.dto.FinderCrawlResult;

public abstract class ContentFinder {

    public abstract FinderCrawlResult crawl(URL url);

    public abstract boolean canHandle(URL url);
}
