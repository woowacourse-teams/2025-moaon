package moaon.backend.article.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import moaon.backend.global.domain.BaseTimeEntity;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@ToString
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Table(indexes = {
        @Index(name = "idx_article_created_at_id", columnList = "createdAt DESC, id DESC"),
        @Index(name = "idx_article_clicks_id", columnList = "clicks DESC, id DESC")
})

public class Article extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String articleUrl;

    @Column(nullable = false)
    private int clicks;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    private ArticleCategory category;

    @ManyToMany
    private List<TechStack> techStacks;

    public Article(
            String title,
            String summary,
            String content,
            String articleUrl,
            LocalDateTime createdAt,
            Project project,
            ArticleCategory category,
            List<TechStack> techStacks
    ) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.articleUrl = articleUrl;
        this.clicks = 0;
        this.createdAt = createdAt;
        this.project = project;
        this.category = category;
        this.techStacks = new ArrayList<>(techStacks);
    }

    public void addClickCount() {
        clicks++;
    }

    public List<TechStack> getTechStacks() {
        return List.copyOf(techStacks);
    }
}
