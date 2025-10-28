package moaon.backend.article.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.List;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.service.ArticleService;
import moaon.backend.global.cookie.AccessHistory;
import moaon.backend.global.cookie.TrackingCookieManager;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import moaon.backend.member.service.OAuthService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final TrackingCookieManager cookieManager;
    private final ArticleService articleService;
    private final OAuthService oAuthService;

    public ArticleController(
            @Qualifier("articleClickCookieManager") TrackingCookieManager cookieManager,
            ArticleService articleService,
            OAuthService oAuthService
    ) {
        this.cookieManager = cookieManager;
        this.articleService = articleService;
        this.oAuthService = oAuthService;
    }

    @PostMapping
    public ResponseEntity<Void> saveArticles(
            @CookieValue(value = "token", required = false) String token,
            @RequestBody @Valid List<ArticleCreateRequest> requests
    ) {
        if (token == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER);
        }
        oAuthService.validateToken(token);
        Member member = oAuthService.getUserByToken(token);
        articleService.save(requests, member);
        return ResponseEntity.status(HttpStatus.CREATED).build();
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
