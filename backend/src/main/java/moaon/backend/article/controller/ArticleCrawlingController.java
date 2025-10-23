package moaon.backend.article.controller;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.service.ArticleCrawlService;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import moaon.backend.member.service.OAuthService;
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

    private final OAuthService oAuthService;
    private final ArticleCrawlService articleCrawlService;

    @GetMapping
    public ResponseEntity<ArticleCrawlResponse> crawl(
            @CookieValue(value = "token", required = false) String token,
            @RequestParam(value = "url") String url
    ) {
        Member member = validateAndGetMember(token);

        ArticleCrawlResult result = articleCrawlService.crawl(url, member.getId());
        articleCrawlService.saveTemporary(url, result);

        return ResponseEntity.ok(ArticleCrawlResponse.from(result, member));
    }

    @GetMapping("/token-count")
    public ResponseEntity<Map<String, Integer>> getRemainingTokens(
            @CookieValue(value = "token", required = false) String token
    ) {
        Member member = validateAndGetMember(token);
        return ResponseEntity.ok(
                Map.of("remainingCount", member.getTodayRemainingTokens())
        );
    }

    private Member validateAndGetMember(String token) {
        if (token == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER);
        }

        oAuthService.validateToken(token);
        return oAuthService.getUserByToken(token);
    }
}
