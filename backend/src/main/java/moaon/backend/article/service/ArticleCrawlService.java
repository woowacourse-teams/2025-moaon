package moaon.backend.article.service;

import java.net.MalformedURLException;
import java.net.URI;
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
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();

    private final ArticleContentRepository repository;

    public ArticleCrawlResult crawl(ArticleCrawlRequest request) {
        try {
            URL url = URI.create(request.url()).toURL();
            ContentFinder finder = FINDER.getFinder(url);
            return finder.crawl(url);
        } catch (MalformedURLException e) {
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_FAILED, e);
        }
    }

    @Transactional
    public ArticleCrawlResponse save(String url, ArticleCrawlResult result) {
        Optional<ArticleContent> content = repository.findByUrl(url);

        String title = result.title();
        String summary = result.summary();

        if (content.isPresent()) {
            content.get().update(result.content());
            return new ArticleCrawlResponse(title, summary);
        }

        repository.save(new ArticleContent(url, result.content()));
        return new ArticleCrawlResponse(title, summary);
    }
}
