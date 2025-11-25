package moaon.backend.article.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.dto.ArticleSearchRequest;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.db.ArticleDBRepository;
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
    private final ArticleDBRepository dbRepository;

    @GetMapping("/articles")
    public ResponseEntity<ArticleResponse> getPagedArticles(@ModelAttribute @Validated ArticleSearchRequest request) {
        ArticleQueryCondition condition = request.toCondition();
        return ResponseEntity.ok(articleService.getPagedArticles(condition));
    }

    @GetMapping("/db/search")
    public ResponseEntity<ArticleResponse> searchFromDB(@ModelAttribute @Validated ArticleSearchRequest request) {
        ArticleSearchResult result = dbRepository.findWithSearchConditions(request.toCondition());
        return ResponseEntity.ok(ArticleResponse.from(result));
    }
}
