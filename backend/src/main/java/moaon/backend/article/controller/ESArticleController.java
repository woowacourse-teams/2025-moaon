package moaon.backend.article.controller;

import jakarta.validation.constraints.Max;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleESQuery;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.service.ESArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class ESArticleController {

    private final ESArticleService service;

    @GetMapping("/es/search")
    @Transactional(readOnly = true)
    public ResponseEntity<ArticleResponse> getPagedArticles(
            @RequestParam(value = "sort", required = false) String sortType,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "sector", required = false) String sector,
            @RequestParam(value = "topics", required = false) List<String> topics,
            @RequestParam(value = "search", required = false) String query,
            @RequestParam(value = "limit") @Validated @Max(100) int limit,
            @RequestParam(value = "cursor", required = false) String cursor
    ) {
        ArticleESQuery articleESQuery = ArticleESQuery.from(query, sector, topics, techStacks, sortType, limit, cursor);

        ArticleResponse search = service.search(articleESQuery);
        return ResponseEntity.ok(search);
    }
}
