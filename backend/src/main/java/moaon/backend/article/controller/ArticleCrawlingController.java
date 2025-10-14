package moaon.backend.article.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleCrawlRequest;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.service.ArticleCrawlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crawl")
@RequiredArgsConstructor
public class ArticleCrawlingController {

    private final ArticleCrawlService articleCrawlService;

    @GetMapping
    public ResponseEntity<ArticleCrawlResponse> crawl(
            @RequestBody ArticleCrawlRequest request
    ) {
        ArticleCrawlResponse crawl = articleCrawlService.crawl(request);
        return ResponseEntity.ok(crawl);
    }
}
