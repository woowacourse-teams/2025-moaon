package moaon.backend.project.controller;

import java.util.List;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cookie.ProjectViewCookieManager;
import moaon.backend.global.cookie.ProjectViewTimes;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.dto.ProjectSummaryResponse;
import moaon.backend.project.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectViewCookieManager cookieManager;

    private final ProjectService projectService;

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailResponse> getProjectById(
            @PathVariable("id") long id,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        ProjectViewTimes projectViewTimes = cookieManager.extractViewedMap(request);
        if (cookieManager.isViewCountIncreasable(id, projectViewTimes)) {
            ProjectDetailResponse projectDetailResponse = projectService.increaseViewsCount(id);
            Cookie cookie = cookieManager.createOrUpdateCookie(id, projectViewTimes);
            response.addCookie(cookie);
            return ResponseEntity.ok(projectDetailResponse);
        }

        ProjectDetailResponse projectDetailResponse = projectService.getById(id);

        return ResponseEntity.ok(projectDetailResponse);
    }

    @GetMapping
    public ResponseEntity<List<ProjectSummaryResponse>> getAllProjects(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "categories", required = false) List<String> categories,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "sort", required = false) String sortType
    ) {
        ProjectQueryCondition projectQueryCondition = ProjectQueryCondition.of(
                search,
                categories,
                techStacks,
                sortType
        );
        return ResponseEntity.ok(projectService.getAllProjects(projectQueryCondition));
    }
}
