package moaon.backend.project.dto;

import java.util.List;
import java.util.stream.IntStream;
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
        return IntStream.range(0, projects.size())
                .mapToObj(index -> from(projects.get(index), loves.get(index)))
                .toList();
    }
}
