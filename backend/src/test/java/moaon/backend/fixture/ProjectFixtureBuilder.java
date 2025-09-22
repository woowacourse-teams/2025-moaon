package moaon.backend.fixture;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.member.domain.Member;
import moaon.backend.project.domain.Category;
import moaon.backend.project.domain.Images;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

public class ProjectFixtureBuilder {

    private Long id;
    private String title;
    private String summary;
    private String description;
    private String githubUrl;
    private String productionUrl;
    private Images images;
    private Member author;
    private List<TechStack> techStacks;
    private List<Category> categories;
    private LocalDateTime createdAt;
    private int views = 0;
    private List<Member> lovedMembers;
    private List<Article> articles;

    public ProjectFixtureBuilder() {
        this.title = Fixture.nameWithSequence("테스트 프로젝트 제목");
        this.summary = Fixture.nameWithSequence("테스트 프로젝트 요약");
        this.description = Fixture.nameWithSequence("테스트 프로젝트 상세 설명");
        this.githubUrl = "https://github.com/test-repo";
        this.productionUrl = "https://test-product.com";
        this.images = new Images(List.of("https://test.com/image1.png", "https://test.com/image2.png"));
        this.author = Fixture.anyMember();
        this.techStacks = new ArrayList<>(List.of(Fixture.anyTechStack()));
        this.categories = new ArrayList<>(List.of(Fixture.anyProjectCategory()));
        this.createdAt = LocalDateTime.now();
        this.lovedMembers = new ArrayList<>();
        this.articles = new ArrayList<>();
    }

    public ProjectFixtureBuilder title(String title) {
        this.title = title;
        return this;
    }

    public ProjectFixtureBuilder summary(String summary) {
        this.summary = summary;
        return this;
    }

    public ProjectFixtureBuilder description(String description) {
        this.description = description;
        return this;
    }

    public ProjectFixtureBuilder id(Long id) {
        this.id = id;
        return this;
    }

    public ProjectFixtureBuilder githubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
        return this;
    }

    public ProjectFixtureBuilder productionUrl(String productionUrl) {
        this.productionUrl = productionUrl;
        return this;
    }

    public ProjectFixtureBuilder images(String... imageUrls) {
        this.images = new Images(Arrays.asList(imageUrls));
        return this;
    }

    public ProjectFixtureBuilder author(Member author) {
        this.author = author;
        return this;
    }

    public ProjectFixtureBuilder techStacks(TechStack... techStacks) {
        this.techStacks = new ArrayList<>(Arrays.asList(techStacks));
        return this;
    }

    public ProjectFixtureBuilder categories(Category... categories) {
        this.categories = new ArrayList<>(Arrays.asList(categories));
        return this;
    }

    public ProjectFixtureBuilder createdAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public ProjectFixtureBuilder views(int views) {
        this.views = views;
        return this;
    }

    public Project build() {
        Project project = Project.builder()
                .id(this.id)
                .title(this.title)
                .productionUrl(this.productionUrl)
                .views(this.views)
                .author(this.author)
                .lovedMembers(this.lovedMembers)
                .createdAt(this.createdAt)
                .summary(this.summary)
                .categories(this.categories)
                .description(this.description)
                .githubUrl(this.githubUrl)
                .images(this.images)
                .techStacks(this.techStacks)
                .articles(this.articles)
                .build();
        for (int i = 0; i < views; i++) {
            project.addViewCount();
        }
        return project;
    }
}
