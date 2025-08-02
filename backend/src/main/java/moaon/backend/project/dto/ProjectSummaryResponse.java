package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

public record ProjectSummaryResponse(
        Long id,
        String title,
        String summary,
        List<String> techStacks,
        String thumbnailUrl,
        boolean isLoved,
        int loves,
        int views
) {

    public static ProjectSummaryResponse from(Project project) {
        return new ProjectSummaryResponse(
                project.getId(),
                project.getTitle(),
                project.getSummary(),
                project.getTechStacks().stream()
                        .map(TechStack::getName)
                        .toList(),
                project.getImages().getThumbnailUrl(),
                false,
                project.getLoveCount(),
                project.getViews()
        );
    }

    public static List<ProjectSummaryResponse> from(List<Project> projects) {
        return projects.stream()
                .map(ProjectSummaryResponse::from)
                .toList();
    }
}
