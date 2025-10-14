package moaon.backend.article.service;

import moaon.backend.article.domain.ContentFinders;
import org.springframework.stereotype.Service;

@Service
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();
//
//    public ArticleCrawlResponse crawl(String url) {
//        ContentFinder finder = FINDER.getFinder(url);
//        String text = finder.getText(url);
//    }
}
