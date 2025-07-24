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

    /**
     * Creates a {@code ProjectSummaryResponse} from a given {@code Project} domain object.
     *
     * Extracts key project details including ID, title, summary, organization name, technology stacks, platforms, thumbnail URL, love count, and view count. The {@code isLoved} field is set to {@code false} by default.
     *
     * @param project the project domain object to convert
     * @return a summary response representing the provided project
     */
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
