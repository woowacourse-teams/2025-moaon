package moaon.backend.article.domain;

import moaon.backend.article.dto.ArticleCrawlResponse;

public abstract class ContentFinder {

    public abstract ArticleCrawlResponse crawl(String url);

    public abstract boolean canHandle(String link);
}
