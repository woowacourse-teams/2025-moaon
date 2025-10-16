package moaon.backend.article.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.service.ArticleCrawlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crawl")
@RequiredArgsConstructor
public class ArticleCrawlingController {

    private final ArticleCrawlService articleCrawlService;

    @GetMapping
    public ResponseEntity<ArticleCrawlResponse> crawl(
            @RequestParam(value = "url") String url
    ) {
        ArticleCrawlResult result = articleCrawlService.crawl(url);
        ArticleCrawlResponse saved = articleCrawlService.save(url, result);
        return ResponseEntity.ok(saved);
    }
}
