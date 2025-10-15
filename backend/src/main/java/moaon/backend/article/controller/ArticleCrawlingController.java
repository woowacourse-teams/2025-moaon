package moaon.backend.article.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleCrawlRequest;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.article.dto.ArticleCrawlResult;
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
            @RequestBody @Valid ArticleCrawlRequest request
    ) {
        ArticleCrawlResult result = articleCrawlService.crawl(request);
        ArticleCrawlResponse saved = articleCrawlService.save(request.url(), result);
        return ResponseEntity.ok(saved);
    }
}
