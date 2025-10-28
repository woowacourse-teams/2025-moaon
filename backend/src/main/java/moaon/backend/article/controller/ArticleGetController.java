package moaon.backend.article.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.dto.ArticleSearchRequest;
import moaon.backend.article.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArticleGetController {

    private final ArticleService articleService;

    @GetMapping("/articles")
    public ResponseEntity<ArticleResponse> getPagedArticles(@ModelAttribute @Validated ArticleSearchRequest request) {
        ArticleQueryCondition condition = request.toCondition();
        return ResponseEntity.ok(articleService.getPagedArticles(condition));
    }

    @GetMapping("/es/search")
    public ResponseEntity<ArticleResponse> searchFromES(@ModelAttribute @Validated ArticleSearchRequest request) {
        ArticleResponse response = articleService.getPagedArticlesFromElasticSearch(request.toCondition());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/db/search")
    public ResponseEntity<ArticleResponse> searchFromDB(@ModelAttribute @Validated ArticleSearchRequest request) {
        ArticleResponse response = articleService.getPagedArticlesFromDatabase(request.toCondition());
        return ResponseEntity.ok(response);
    }
}
