package moaon.backend.article.service;

import moaon.backend.article.domain.ContentFinder;
import moaon.backend.article.domain.ContentFinders;
import moaon.backend.article.dto.ArticleCrawlRequest;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.dto.ArticleCrawlResult;
import org.springframework.stereotype.Service;

@Service
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();

    public ArticleCrawlResponse crawl(ArticleCrawlRequest request) {
        ContentFinder finder = FINDER.getFinder(request.url());
        ArticleCrawlResult result = finder.crawl(request.url());

        String title = result.title();
        String summary = result.summary();

        return new ArticleCrawlResponse(title, summary);
    }
}
