package moaon.backend.article.controller;

import jakarta.validation.constraints.Max;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.ArticleDocumentRepository;
import moaon.backend.global.domain.SearchKeyword;
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
            @RequestParam(value = "sort", required = false) String sortType,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "sector", required = false) String sector,
            @RequestParam(value = "topics", required = false) List<String> topics,
            @RequestParam(value = "q", required = false) String query,
            @RequestParam(value = "limit", defaultValue = "100") @Validated @Max(100) int limit,
            @RequestParam(value = "cursor", required = false) String cursor
    ) {
        final var searchKeyword = new SearchKeyword(query);

        final var documents = repository.search(searchKeyword);
        System.out.println("documents = " + documents.size());
        System.out.println("documents.getFirst() = " + documents.getFirst());
        return ResponseEntity.ok(documents);
    }
}
