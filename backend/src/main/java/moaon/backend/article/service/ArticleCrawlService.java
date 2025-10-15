package moaon.backend.article.service;

import java.net.URL;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleContent;
import moaon.backend.article.domain.ContentFinder;
import moaon.backend.article.domain.ContentFinders;
import moaon.backend.article.dto.ArticleCrawlRequest;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.repository.ArticleContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();

    private final ArticleContentRepository repository;

    public ArticleCrawlResult crawl(ArticleCrawlRequest request) {
        ContentFinder finder = FINDER.getFinder(request.url());
        return finder.crawl(request.url());
    }

    @Transactional
    public ArticleCrawlResponse save(URL url, ArticleCrawlResult result) {
        Optional<ArticleContent> content = repository.findByUrl(url.toString());

        String title = result.title();
        String summary = result.summary();

        if (content.isPresent()) {
            content.get().update(result.content());
            return new ArticleCrawlResponse(title, summary);
        }

        repository.save(new ArticleContent(url.toString(), result.content()));
        return new ArticleCrawlResponse(title, summary);
    }
}
