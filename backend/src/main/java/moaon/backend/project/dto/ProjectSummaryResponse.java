package moaon.backend.project.dto;

import java.util.ArrayList;
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

    public static ProjectSummaryResponse from(Project project, int loves) {
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
                loves,
                project.getViews()
        );
    }

    public static List<ProjectSummaryResponse> from(List<Project> projects, List<Integer> loves) {
        List<ProjectSummaryResponse> responses = new ArrayList<>();

        for (int i = 0; i < projects.size(); i++) {
            Project project = projects.get(i);
            Integer love = loves.get(i);
            ProjectSummaryResponse projectSummaryResponse = from(project, love);
            responses.add(projectSummaryResponse);
        }

        return responses;
    }
}
