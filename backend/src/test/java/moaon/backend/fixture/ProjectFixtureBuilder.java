package moaon.backend.fixture;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import moaon.backend.member.domain.Member;
import moaon.backend.project.domain.Images;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.techStack.domain.TechStack;

public class ProjectFixtureBuilder {

    private String title;
    private String summary;
    private String description;
    private String githubUrl;
    private String productionUrl;
    private Images images;
    private Member author;
    private List<TechStack> techStacks;
    private List<ProjectCategory> categories;
    private LocalDateTime createdAt;
    private int views = 0;

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

    public ProjectFixtureBuilder categories(ProjectCategory... categories) {
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
        Project project = new Project(
                this.title,
                this.summary,
                this.description,
                this.githubUrl,
                this.productionUrl,
                this.images,
                this.author,
                this.techStacks,
                this.categories,
                this.createdAt
        );
        for (int i = 0; i < views; i++) {
            project.addViewCount();
        }
        return project;
    }
}
