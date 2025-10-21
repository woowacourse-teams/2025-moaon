package moaon.backend.article.service;

import java.net.URL;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleContent;
import moaon.backend.article.domain.ContentFinder;
import moaon.backend.article.domain.ContentFinders;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.dto.FinderCrawlResult;
import moaon.backend.article.repository.ArticleContentRepository;
import moaon.backend.global.parser.URLParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();

    private final ArticleContentRepository repository;
    private final GptService gptService = new GptService();

    public ArticleCrawlResult crawl(String url) {
        URL parsedUrl = URLParser.parse(url);
        ContentFinder finder = FINDER.getFinder(parsedUrl);
        FinderCrawlResult crawlResult = finder.crawl(parsedUrl);

        return gptService.summarizeByGpt(crawlResult);
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
