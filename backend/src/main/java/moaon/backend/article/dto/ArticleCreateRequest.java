package moaon.backend.article.dto;

import java.util.List;

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
