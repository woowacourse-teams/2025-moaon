package moaon.backend.article.domain;

import java.net.URL;
import moaon.backend.article.dto.ArticleCrawlResult;

public abstract class ContentFinder {

    public abstract ArticleCrawlResult crawl(URL url);

    public abstract boolean canHandle(URL url);
}
