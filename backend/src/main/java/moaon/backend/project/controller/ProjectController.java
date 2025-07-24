package moaon.backend.project.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
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

    private final ProjectService projectService;

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailResponse> getProjectById(@PathVariable("id") long id) {
        return ResponseEntity.ok(projectService.getById(id));
    }

    /**
     * Retrieves a list of project summaries filtered and sorted according to the provided query parameters.
     *
     * Optional filters include search keyword, platforms, categories, organizations, tech stacks, and sort type.
     *
     * @param search      optional keyword to search for in project data
     * @param platforms   optional list of platform names to filter projects
     * @param categories  optional list of category names to filter projects
     * @param organizations optional list of organization names to filter projects
     * @param techStacks  optional list of technology stack names to filter projects
     * @param sortType    optional sort type for ordering the results
     * @return a ResponseEntity containing a list of project summaries matching the criteria
     */
    @GetMapping
    public ResponseEntity<List<ProjectSummaryResponse>> getAllProjects(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "platforms", required = false) List<String> platforms,
            @RequestParam(value = "categories", required = false) List<String> categories,
            @RequestParam(value = "organizations", required = false) List<String> organizations,
            @RequestParam(value = "techStacks", required = false) List<String> techStacks,
            @RequestParam(value = "sort", required = false) String sortType
    ) {
        ProjectQueryCondition projectQueryCondition = ProjectQueryCondition.of(
                search,
                platforms,
                categories,
                organizations,
                techStacks,
                sortType
        );
        return ResponseEntity.ok(projectService.getAllProjects(projectQueryCondition));
    }
}
