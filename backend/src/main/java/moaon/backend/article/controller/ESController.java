package moaon.backend.article.controller;

import jakarta.validation.constraints.Max;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.ArticleDocumentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class ESController {

    private final ArticleDocumentRepository repository;

    @GetMapping("/es/search")
    public ResponseEntity<List<ArticleDocument>> getPagedArticles(
            @RequestParam(value = "sort", required = false, defaultValue = "createdAt") String sortType,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "sector", required = false) String sector,
            @RequestParam(value = "topics", required = false) List<String> topics,
            @RequestParam(value = "search", required = false) String query,
            @RequestParam(value = "limit", defaultValue = "20") @Validated @Max(100) int limit,
            @RequestParam(value = "cursor", required = false) String cursor
    ) {
        final var condition = ArticleQueryCondition.from(
                query, sector, topics, techStacks, sortType, limit, cursor
        );

        final var documents = repository.search(condition);
        System.out.println("documents = " + documents.size());
        return ResponseEntity.ok(documents);
    }
}
