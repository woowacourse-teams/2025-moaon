package moaon.backend.article.domain;

import java.net.URL;
import moaon.backend.article.dto.ArticleCrawlResponse;

public abstract class ContentFinder {

    public abstract ArticleCrawlResponse crawl(URL url);

    public abstract boolean canHandle(URL url);
}
