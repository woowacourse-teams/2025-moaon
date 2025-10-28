package moaon.backend.article.api.crawl.controller;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.api.crawl.dto.ArticleCrawlResponse;
import moaon.backend.article.api.crawl.dto.ArticleCrawlResult;
import moaon.backend.article.api.crawl.service.ArticleCrawlService;
import moaon.backend.member.domain.Member;
import moaon.backend.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crawl")
@RequiredArgsConstructor
public class ArticleCrawlingController {

    private final ArticleCrawlService articleCrawlService;
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<ArticleCrawlResponse> crawl(
            @CookieValue(value = "token", required = false) String token,
            @RequestParam(value = "url") String url
    ) {
        Member member = memberService.getUserByToken(token);

        ArticleCrawlResult result = articleCrawlService.crawl(url, member);
        articleCrawlService.saveTemporary(url, result);
        if (result.isSucceed()) {
            memberService.increaseCrawlCount(member.getId());
        }

        return ResponseEntity.ok(ArticleCrawlResponse.from(result, member));
    }

    @GetMapping("/token-count")
    public ResponseEntity<Map<String, Integer>> getRemainingTokens(
            @CookieValue(value = "token", required = false) String token
    ) {
        Member member = memberService.getUserByToken(token);
        return ResponseEntity.ok(
                Map.of("remainingCount", member.getTodayRemainingTokens())
        );
    }
}
