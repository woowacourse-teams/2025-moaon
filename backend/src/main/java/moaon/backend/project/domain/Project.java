package moaon.backend.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.util.List;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import moaon.backend.category.domain.Category;
import moaon.backend.global.domain.BaseTimeEntity;
import moaon.backend.member.domain.Member;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.techStack.domain.TechStack;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@ToString
public class Project extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false)
    private String description;

    @Column
    private String githubUrl;

    @Column
    private String productionUrl;

    @Embedded
    private Images imageUrls;

    @Column
    private int views;

    @ManyToOne
    private Organization organization;

    @ManyToOne
    private Member author;

    @ManyToMany
    private List<TechStack> techStacks;

    @ManyToMany
    private List<Category> categories;

    @ManyToMany
    private List<Platform> platforms;

    public Project(
            String title, String summary, String description,
            String githubUrl, String productionUrl, Images imageUrls,
            int views,
            Organization organization, Member author,
            List<TechStack> techStacks, List<Category> categories, List<Platform> platforms
    ) {
        this.title = title;
        this.summary = summary;
        this.description = description;
        this.githubUrl = githubUrl;
        this.productionUrl = productionUrl;
        this.imageUrls = imageUrls;
        this.views = views;
        this.organization = organization;
        this.author = author;
        this.techStacks = techStacks;
        this.categories = categories;
        this.platforms = platforms;
    }

    public void addViewCount() {
        views++;
    }
}
