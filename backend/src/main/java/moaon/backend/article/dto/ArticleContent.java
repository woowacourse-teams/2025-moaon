package moaon.backend.article.dto;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.techStack.domain.TechStack;

public record ArticleContent(
        Long id,
        Long projectId,
        String projectTitle,
        int clicks,
        String title,
        String summary,
        List<String> techStacks,
        String url,
        String category,
        LocalDateTime createdAt
) {

    public static ArticleContent from(Article article) {
        return new ArticleContent(
                article.getId(),
                article.getProject().getId(),
                article.getProject().getTitle(),
                article.getClicks(),
                article.getTitle(),
                article.getSummary(),
                article.getTechStacks().stream()
                        .map(TechStack::getName)
                        .toList(),
                article.getArticleUrl(),
                article.getSector().getName(),
                article.getCreatedAt()
        );
    }

    public static List<ArticleContent> from(List<Article> articles) {
        return articles.stream()
                .map(ArticleContent::from)
                .toList();
    }
}
