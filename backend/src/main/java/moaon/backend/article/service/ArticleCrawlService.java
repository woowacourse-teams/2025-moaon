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
import moaon.backend.article.exception.AiSummaryFailedException;
import moaon.backend.article.repository.ArticleContentRepository;
import moaon.backend.global.parser.URLParser;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleCrawlService {

    private static final ContentFinders FINDER = new ContentFinders();

    private final ArticleContentRepository repository;
    private final AiSummaryClient aiSummaryService;
    private final MemberRepository memberRepository;

    public ArticleCrawlResult crawl(String url, long memberId) {
        URL parsedUrl = URLParser.parse(url);
        ContentFinder finder = FINDER.getFinder(parsedUrl);
        FinderCrawlResult crawlResult = finder.crawl(parsedUrl);
        Member member = memberRepository.findById(memberId).orElseThrow();

        if (member.isCrawlCountOvered()) {
            log.info("사용자 하루 토큰 횟수 한계입니다. memberId: {}", member.getId());
            return ArticleCrawlResult.withoutSummary(crawlResult);
        }

        try {

            try {
                ArticleCrawlResult result = aiSummaryService.summarize(crawlResult,
                        "meta-llama/llama-3.3-8b-instruct:free");
                log.info("무료 AI 토큰을 사용해 아티클을 요약했습니다. memberId: {}", member.getId());
                member.addCrawlCount();
                return result;

            } catch (AiNoCostException e) {
                try {
                    ArticleCrawlResult result = aiSummaryService.summarize(crawlResult, "gpt-3.5-turbo");
                    log.info("무료 AI 토큰 사용량을 초과해 GPT-3.5 turbo로 아티클을 요약했습니다. memberId: {}", member.getId());
                    member.addCrawlCount();
                    return result;
                } catch (AiNoCostException e1) {
                    log.warn("GPT AI 토큰 사용량이 한계에 달해 요약에 실패했습니다.");
                    return ArticleCrawlResult.withoutSummary(crawlResult);
                } catch (AiSummaryFailedException e1) {
                    log.error("GPT AI 요약에 실패했습니다. status code: {}, message: {}", e1.getResponseStatusCode(),
                            e1.getResponseMessage());
                    return ArticleCrawlResult.withoutSummary(crawlResult);
                }

            } catch (AiSummaryFailedException e) {
                try {
                    ArticleCrawlResult result = aiSummaryService.summarize(crawlResult, "gpt-3.5-turbo");
                    log.info("무료 AI 모델 실패로 인해 Meta GPT-3.5 turbo로 아티클을 요약했습니다. memberId: {}", member.getId());
                    member.addCrawlCount();
                    return result;
                } catch (AiNoCostException e1) {
                    log.warn("GPT AI 토큰 사용량이 한계에 달해 요약에 실패했습니다.");
                    return ArticleCrawlResult.withoutSummary(crawlResult);
                } catch (AiSummaryFailedException e1) {
                    log.error("GPT AI 요약에 실패했습니다. status code: {}, message: {}", e1.getResponseStatusCode(),
                            e1.getResponseMessage());
                    return ArticleCrawlResult.withoutSummary(crawlResult);
                }

            }

        } catch (Exception e) {
            log.error("아티클 요약에 실패했습니다.", e);
            return ArticleCrawlResult.withoutSummary(crawlResult);
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
