package moaon.backend.article.dto;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Topic;
import moaon.backend.techStack.domain.TechStack;

public record ArticleData(
        Long id,
        Long projectId,
        String projectTitle,
        int clicks,
        String title,
        String summary,
        List<String> techStacks,
        String url,
        String sector,
        List<String> topics,
        LocalDateTime createdAt
) {

    public static ArticleData from(Article article) {
        return new ArticleData(
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
                article.getTopics().stream().map(Topic::getName).toList(),
                article.getCreatedAt()
        );
    }

    public static List<ArticleData> from(List<Article> articles) {
        return articles.stream()
                .map(ArticleData::from)
                .toList();
    }
}
