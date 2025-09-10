package moaon.backend.article.dto;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Topic;
import moaon.backend.techStack.domain.TechStack;

public record ArticleDetailResponse(
        long id,
        String title,
        String summary,
        int clicks,
        List<String> techStacks,
        String url,
        String sector,
        List<String> topics,
        LocalDateTime createdAt
) {

    public static ArticleDetailResponse from(Article article) {
        return new ArticleDetailResponse(
                article.getId(),
                article.getTitle(),
                article.getSummary(),
                article.getClicks(),
                article.getTechStacks().stream()
                        .map(TechStack::getName)
                        .toList(),
                article.getArticleUrl(),
                article.getSector().getName(),
                article.getTopics().stream()
                        .map(Topic::getName)
                        .toList(),
                article.getCreatedAt()
        );
    }

    public static List<ArticleDetailResponse> from(List<Article> articles) {
        return articles.stream()
                .map(ArticleDetailResponse::from)
                .toList();
    }
}
