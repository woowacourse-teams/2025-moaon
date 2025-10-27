package moaon.backend.project.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import java.util.List;
import moaon.backend.article.service.ArticleService;
import moaon.backend.global.cookie.AccessHistory;
import moaon.backend.global.cookie.TrackingCookieManager;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.service.OAuthService;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleResponse;
import moaon.backend.project.dto.ProjectCreateRequest;
import moaon.backend.project.dto.ProjectCreateResponse;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final TrackingCookieManager cookieManager;
    private final ProjectService projectService;
    private final ArticleService articleService;
    private final OAuthService oAuthService;

    public ProjectController(
            @Qualifier("projectViewCookieManager") TrackingCookieManager cookieManager,
            ProjectService projectService,
            ArticleService articleService,
            OAuthService oAuthService
    ) {
        this.cookieManager = cookieManager;
        this.projectService = projectService;
        this.articleService = articleService;
        this.oAuthService = oAuthService;
    }

    @PostMapping
    public ResponseEntity<ProjectCreateResponse> saveProject(
            @CookieValue(value = "token", required = false) String token,
            @RequestBody @Valid ProjectCreateRequest projectCreateRequest
    ) {
        if (token == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER);
        }
        oAuthService.validateToken(token);

        Long savedId = projectService.save(token, projectCreateRequest);
        ProjectCreateResponse response = ProjectCreateResponse.from(savedId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailResponse> getProjectById(
            @PathVariable("id") long id,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
//        AccessHistory accessHistory = cookieManager.extractViewedMap(request);
//        if (cookieManager.isCountIncreasable(id, accessHistory)) {
//            ProjectDetailResponse projectDetailResponse = projectService.increaseViewsCount(id);
//            cookieManager.createOrUpdateCookie(id, accessHistory, response);
//            return ResponseEntity.ok(projectDetailResponse);
//        }

        ProjectDetailResponse projectDetailResponse = projectService.getById(id);

        return ResponseEntity.ok(projectDetailResponse);
    }

    @GetMapping
    public ResponseEntity<PagedProjectResponse> getPagedProjects(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "categories", required = false) List<String> categories,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "sort", required = false) String sortType,
            @RequestParam(value = "limit") @Validated @Max(100) int limit,
            @RequestParam(value = "cursor", required = false) String cursor
    ) {
        ProjectQueryCondition projectQueryCondition = ProjectQueryCondition.of(
                search,
                categories,
                techStacks,
                sortType,
                limit,
                cursor
        );
        return ResponseEntity.ok(projectService.getPagedProjects(projectQueryCondition));
    }

    @GetMapping("/{id}/articles")
    public ResponseEntity<ProjectArticleResponse> getArticlesByProjectId(
            @PathVariable("id") long id,
            @RequestParam(value = "sector", required = false) String sector,
            @RequestParam(value = "search", required = false) String search
    ) {
        ProjectArticleResponse projectArticleResponse = articleService.getByProjectId(
                id,
                ProjectArticleQueryCondition.from(sector, search)
        );
        return ResponseEntity.ok(projectArticleResponse);
    }
}
