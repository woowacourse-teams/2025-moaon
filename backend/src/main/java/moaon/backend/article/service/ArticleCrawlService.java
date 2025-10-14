package moaon.backend.article.service;

import moaon.backend.article.domain.ContentFinder;
import moaon.backend.article.domain.ContentFinders;
import moaon.backend.article.dto.ArticleCrawlRequest;
import moaon.backend.article.dto.ArticleCrawlResponse;
import org.springframework.stereotype.Service;

@Service
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();

    public ArticleCrawlResponse crawl(ArticleCrawlRequest request) {
        ContentFinder finder = FINDER.getFinder(request.url());
        return finder.crawl(request.url());
    }
}
