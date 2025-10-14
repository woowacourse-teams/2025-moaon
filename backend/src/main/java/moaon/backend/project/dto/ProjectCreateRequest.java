package moaon.backend.project.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Builder;

@Builder
public record ProjectCreateRequest(
        @NotNull
        String title,
        @NotNull
        String summary,
        @NotNull
        String description,
        @NotNull
        List<String> techStacks,
        @NotNull
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
