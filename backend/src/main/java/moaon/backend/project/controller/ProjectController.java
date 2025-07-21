package moaon.backend.project.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
