package moaon.backend.project.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record ProjectCreateRequest(
        String title,
        String summary,
        String description,
        List<String> techStacks,
        List<String> categories,
        List<String> imageUrls,
        String githubUrl,
        String productionUrl
) {

    public static ProjectCreateRequest from(
            String title,
            String summary,
            String description,
            List<String> techStacks,
            List<String> categories,
            List<String> imageUrls,
            String githubUrl,
            String productionUrl
    ) {
        return new ProjectCreateRequest(
                title,
                summary,
                description,
                techStacks,
                categories,
                imageUrls,
                githubUrl,
                productionUrl
        );
    }
}
