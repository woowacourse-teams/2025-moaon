package moaon.backend.article.dto;

import java.net.URL;
import java.util.List;
import lombok.Builder;

@Builder
public record ArticleCreateRequest(
        Long projectId,
        String projectTitle,
        String title,
        String summary,
        List<String> techStacks,
        URL url,
        String sector,
        List<String> topics
) {
}
