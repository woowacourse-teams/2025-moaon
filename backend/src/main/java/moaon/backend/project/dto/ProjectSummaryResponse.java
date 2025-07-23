package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.platform.domain.Platform;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

public record ProjectSummaryResponse(
        Long id,
        String title,
        String summary,
        String organization,
        List<String> techStacks,
        List<String> platforms,
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
                project.getOrganization().getName(),
                project.getTechStacks().stream()
                        .map(TechStack::getName)
                        .toList(),
                project.getPlatforms().stream()
                        .map(Platform::getName)
                        .toList(),
                project.getImages().getUrls().getFirst(),
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
