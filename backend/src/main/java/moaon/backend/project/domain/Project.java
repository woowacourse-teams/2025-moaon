package moaon.backend.project.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToMany;
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
import moaon.backend.article.domain.Article;
import moaon.backend.global.domain.BaseTimeEntity;
import moaon.backend.member.domain.Member;
import moaon.backend.techStack.domain.ProjectTechStack;
import moaon.backend.techStack.domain.TechStack;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@ToString
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Table(indexes = {
        @Index(name = "idx_project_created_at_id", columnList = "createdAt DESC, id DESC"),
        @Index(name = "idx_project_views_id", columnList = "views DESC, id DESC")
})
public class Project extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String githubUrl;

    @Column(length = 500)
    private String productionUrl;

    @Embedded
    private Images images;

    @Column(nullable = false)
    private int views;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    private Member author;

    @ManyToMany
    private List<Member> lovedMembers;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectTechStack> techStacks;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectCategory> categories;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Article> articles;

    public Project(
            String title,
            String summary,
            String description,
            String githubUrl,
            String productionUrl,
            Images images,
            Member author,
            List<ProjectTechStack> techStacks,
            List<ProjectCategory> categories,
            LocalDateTime createdAt
    ) {
        this.title = title;
        this.summary = summary;
        this.description = description;
        this.githubUrl = githubUrl;
        this.productionUrl = productionUrl;
        this.images = images;
        this.views = 0;
        this.author = author;
        this.lovedMembers = new ArrayList<>();
        this.techStacks = new ArrayList<>(techStacks);
        this.categories = new ArrayList<>(categories);
        this.createdAt = createdAt;
    }

    public void addViewCount() {
        views++;
    }

    public void addCategory(Category category) {
        ProjectCategory projectCategory = new ProjectCategory(this, category);
        this.categories.add(projectCategory);
    }

    public void addTechStack(TechStack techStack) {
        ProjectTechStack projectTechStack = new ProjectTechStack(this, techStack);
        this.techStacks.add(projectTechStack);
    }

    public int getLoveCount() {
        return lovedMembers.size();
    }

    public void addLovedMember(Member member) {
        lovedMembers.add(member);
    }

    public List<TechStack> getTechStacks() {
        return techStacks.stream()
                .map(ProjectTechStack::getTechStack)
                .toList();
    }

    public List<Category> getCategories() {
        return categories.stream()
                .map(ProjectCategory::getCategory)
                .toList();
    }

    public List<Member> getLovedMembers() {
        return List.copyOf(lovedMembers);
    }
}
