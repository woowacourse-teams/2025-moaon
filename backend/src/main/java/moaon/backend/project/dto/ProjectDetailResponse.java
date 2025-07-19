package moaon.backend.project.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ProjectDetailResponse(
        long id,
        long authorId,
        String title,
        String summary,
        String description,
        String group,
        List<String> techStacks,
        List<String> platforms,
        List<String> categories,
        List<String> imageUrls,
        boolean isLoved,
        int loves,
        int views,
        LocalDateTime createdAt,
        String githubUrl,
        String productionUrl
) {
}
