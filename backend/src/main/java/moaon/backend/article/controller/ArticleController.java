package moaon.backend.article.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<ArticleResponse> getPagedArticles(
            @RequestParam(value = "sort", required = false) String sortType,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "category", required = false, defaultValue = "all") String category,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "limit") int limit,
            @RequestParam(value = "cursor", required = false) String cursor
    ) {
        ArticleQueryCondition queryCondition = ArticleQueryCondition.from(
                search,
                category,
                techStacks,
                sortType,
                limit,
                cursor
        );

        return ResponseEntity.ok(articleService.getPagedArticles(queryCondition));
    }
}
