package moaon.backend.article.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.dto.ArticleSearchRequest;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArticleESController {

    private final ArticleDocumentRepository repository;

    @GetMapping("/es/search")
    public ResponseEntity<ArticleResponse> getPagedArticles(@ModelAttribute @Validated ArticleSearchRequest request) {
        ArticleQueryCondition condition = request.toCondition();
        ArticleSearchResult result = repository.search(condition);
        return ResponseEntity.ok(ArticleResponse.from(result));
    }
}
