package moaon.backend.project.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.project.dto.ProjectDetailResponse;
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

    private final ProjectService projectService;

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailResponse> getProjectById(@PathVariable("id") long id) {
        return ResponseEntity.ok(projectService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProjectSummaryResponse>> getAllProjects(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "platforms", required = false) List<String> platforms,
            @RequestParam(value = "categories", required = false) List<String> categories,
            @RequestParam(value = "organizations", required = false) List<String> organizations,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks
    ) {
        return ResponseEntity.ok(projectService.getAllProjects(
                search,
                platforms,
                categories,
                organizations,
                techStacks
        ));
    }
}
