package moaon.backend.article.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record ArticleCreateRequest(
        Long projectId,
        String projectTitle,
        String title,
        String summary,
        List<String> techStacks,
        String url,
        String sector,
        List<String> topics
) {
}
