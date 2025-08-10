package moaon.backend.article.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.service.ArticleService;
import moaon.backend.global.cookie.AccessHistory;
import moaon.backend.global.cookie.TrackingCookieManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final TrackingCookieManager cookieManager;
    private final ArticleService articleService;

    public ArticleController(
            @Qualifier("articleClickCookieManager") TrackingCookieManager cookieManager,
            ArticleService articleService
    ) {
        this.cookieManager = cookieManager;
        this.articleService = articleService;
    }

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

    @PostMapping("/{id}/clicks")
    public ResponseEntity<Void> updateArticleClicks(
            @PathVariable("id") long id,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        AccessHistory accessHistory = cookieManager.extractViewedMap(request);
        if (cookieManager.isCountIncreasable(id, accessHistory)) {
            articleService.increaseClicksCount(id);
            cookieManager.createOrUpdateCookie(id, accessHistory, response);
        }
        return ResponseEntity.ok().build();
    }
}
