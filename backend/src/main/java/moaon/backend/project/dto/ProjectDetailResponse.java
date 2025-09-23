package moaon.backend.project.dto;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.project.domain.Category;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

public record ProjectDetailResponse(
        long id,
        long authorId,
        String title,
        String summary,
        String description,
        List<String> techStacks,
        List<String> categories,
        List<String> imageUrls,
        boolean isLoved,
        int loves,
        int views,
        LocalDateTime createdAt,
        String githubUrl,
        String productionUrl
) {

    public static ProjectDetailResponse from(Project project) {
        return new ProjectDetailResponse(
                project.getId(),
                project.getAuthor().getId(),
                project.getTitle(),
                project.getSummary(),
                project.getDescription(),
                project.getTechStacks().stream()
                        .map(TechStack::getName)
                        .toList(),
                project.getCategories().stream()
                        .map(Category::getName)
                        .toList(),
                project.getImages().getUrls(),
                false, // TODO 로그인 추가 시 수정
                project.getLoveCount(),
                project.getViews(),
                project.getCreatedAt(),
                project.getGithubUrl(),
                project.getProductionUrl()
        );
    }
}
