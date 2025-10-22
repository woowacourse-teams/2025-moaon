package moaon.backend.article.service;

import java.net.URL;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.ArticleContent;
import moaon.backend.article.domain.ContentFinder;
import moaon.backend.article.domain.ContentFinders;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.dto.FinderCrawlResult;
import moaon.backend.article.exception.AiNoCostException;
import moaon.backend.article.repository.ArticleContentRepository;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.parser.URLParser;
import moaon.backend.member.domain.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();

    private final ArticleContentRepository repository;
    private final AiSummaryClient aiSummaryService;

    public ArticleCrawlResult crawl(String url, Member member) {
        if (member.isCrawlCountOvered()) {
            log.info("사용자 하루 토큰 횟수 한계입니다. memberId: {}", member.getId());
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_TIMES_OVER);
        }
        member.addCrawlCount();

        URL parsedUrl = URLParser.parse(url);
        ContentFinder finder = FINDER.getFinder(parsedUrl);
        FinderCrawlResult crawlResult = finder.crawl(parsedUrl);

        try {

            try {
                ArticleCrawlResult result = aiSummaryService.summarize(crawlResult,
                        "meta-llama/llama-3.3-8b-instruct:free");
                log.info("무료 AI 토큰을 사용해 아티클을 요약했습니다. memberId: {}", member.getId());
                return result;

            } catch (AiNoCostException e) {
                try {
                    ArticleCrawlResult result = aiSummaryService.summarize(crawlResult, "gpt-3.5-turbo");
                    log.info("무료 AI 토큰 사용량을 초과해 GPT-3.5 turbo로 아티클을 요약했습니다. memberId: {}", member.getId());
                    return result;
                } catch (AiNoCostException e1) {
                    log.warn("gpt-3.5-turbo의 토큰 비용이 한계입니다.");
                    throw new CustomException(ErrorCode.ARTICLE_CRAWL_FAILED);
                }
            }

        } catch (Exception e) {
            log.error("아티클 요약에 실패했습니다.", e);
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_FAILED);
        }
    }

    @Transactional
    public void saveTemporary(String url, ArticleCrawlResult result) {
        Optional<ArticleContent> content = repository.findByUrl(url);
        if (content.isEmpty()) {
            repository.save(new ArticleContent(url, result.content()));
            return;
        }

        content.get().update(result.content());
    }
}
