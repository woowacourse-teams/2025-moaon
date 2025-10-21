package moaon.backend.article.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.service.ArticleCrawlService;
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
        oAuthService.validateToken(token);
        Member member = oAuthService.getUserByToken(token);
        ArticleCrawlResult result = articleCrawlService.crawl(url, member);
        ArticleCrawlResponse saved = articleCrawlService.save(url, result);
        return ResponseEntity.ok(saved);
    }
}
