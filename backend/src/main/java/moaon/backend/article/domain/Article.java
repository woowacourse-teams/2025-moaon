package moaon.backend.article.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
import moaon.backend.techStack.domain.ArticleTechStack;
import moaon.backend.techStack.domain.TechStack;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@ToString(exclude = {"project", "techStacks"})
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

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 500)
    private String articleUrl;

    @Column(nullable = false)
    private int clicks;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ArticleTechStack> techStacks;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sector sector;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Topic> topics;

    // todo topic과 sector의 포함 관계 확인?
    public Article(
            String title,
            String summary,
            String content,
            String articleUrl,
            LocalDateTime createdAt,
            Project project,
            Sector sector,
            List<Topic> topics,
            List<ArticleTechStack> techStacks
    ) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.articleUrl = articleUrl;
        this.clicks = 0;
        this.createdAt = createdAt;
        this.project = project;
        this.sector = sector;
        this.topics = topics;
        this.techStacks = new ArrayList<>(techStacks);
    }

    public void addClickCount() {
        clicks++;
    }

    public void addTechStack(TechStack techStack) {
        ArticleTechStack articleTechStack = new ArticleTechStack(this, techStack);
        this.techStacks.add(articleTechStack);
    }

    public List<TechStack> getTechStacks() {
        return techStacks.stream()
                .map(ArticleTechStack::getTechStack)
                .toList();
    }
}
