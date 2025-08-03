package moaon.backend.article.dto;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.techStack.domain.TechStack;

public record Content(
        Long id,
        Long projectId,
        int clicks,
        String title,
        String summary,
        List<String> techStacks,
        String url,
        String category,
        LocalDateTime createdAt
) {

    public static Content from(Article article) {
        return new Content(
                article.getId(),
                article.getProject().getId(),
                article.getClicks(),
                article.getTitle(),
                article.getSummary(),
                article.getTechStacks().stream()
                        .map(TechStack::getName)
                        .toList(),
                article.getArticleUrl(),
                article.getCategory().getName(),
                article.getCreatedAt()
        );
    }

    public static List<Content> from(List<Article> articles) {
        return articles.stream()
                .map(Content::from)
                .toList();
    }
}
