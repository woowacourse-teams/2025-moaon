package moaon.backend.article.controller;

import jakarta.validation.constraints.Max;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class ESController {

    private final ESService service;

    @GetMapping("/es/search")
    @Transactional(readOnly = true)
    public ResponseEntity<ArticleResponse> getPagedArticles(
            @RequestParam(value = "sort", required = false, defaultValue = "createdAt") String sortType,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "sector", required = false) String sector,
            @RequestParam(value = "topics", required = false) List<String> topics,
            @RequestParam(value = "search", required = false) String query,
            @RequestParam(value = "limit", defaultValue = "20") @Validated @Max(100) int limit,
            @RequestParam(value = "cursor", required = false) String cursor
    ) {
        final var condition = toQueryCondition(sortType, techStacks, sector, topics, query, limit, cursor);

        final var articles = service.search(condition);
        return ResponseEntity.ok(articles);
    }

    private static ArticleQueryCondition toQueryCondition(
            final String sortType,
            final List<String> techStacks,
            final String sector,
            final List<String> topics,
            final String query,
            final int limit,
            final String cursor) {
        if (cursor == null) {
            return ArticleQueryCondition.from(query, sector, topics, techStacks, sortType, limit, (String) null);
        }
        return ArticleQueryCondition.from(query, sector, topics, techStacks, sortType, limit, new ESCursor(cursor));
    }
}
