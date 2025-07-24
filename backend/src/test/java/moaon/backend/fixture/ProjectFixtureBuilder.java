package moaon.backend.fixture;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.member.domain.Member;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.project.domain.Images;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

public class ProjectFixtureBuilder {

    private String title;
    private String summary;
    private String description;
    private String githubUrl;
    private String productionUrl;
    private Images images;
    private Organization organization;
    private Member author;
    private List<TechStack> techStacks;
    private List<Category> categories;
    private List<Platform> platforms;
    private LocalDateTime createdAt;

    /**
     * Initializes a ProjectFixtureBuilder with default test values for all fields.
     *
     * Sets sample data for project attributes such as title, summary, description, URLs, images, organization, author, tech stacks, categories, platforms, and creation timestamp.
     */
    private ProjectFixtureBuilder() {
        this.title = Fixture.nameWithSequence("테스트 프로젝트 제목");
        this.summary = Fixture.nameWithSequence("테스트 프로젝트 요약");
        this.description = Fixture.nameWithSequence("테스트 프로젝트 상세 설명");
        this.githubUrl = "https://github.com/test-repo";
        this.productionUrl = "https://test-product.com";
        this.images = new Images(List.of("https://test.com/image1.png", "https://test.com/image2.png"));
        this.organization = Fixture.anyOrganization();
        this.author = Fixture.anyMember();
        this.techStacks = new ArrayList<>(List.of(Fixture.anyTechStack()));
        this.categories = new ArrayList<>(List.of(Fixture.anyCategory()));
        this.platforms = new ArrayList<>(List.of(Fixture.anyPlatform()));
        this.createdAt = LocalDateTime.now();
    }

    /**
     * Creates a new builder instance pre-populated with default test values for all project attributes.
     *
     * @return a ProjectFixtureBuilder initialized with sample data
     */
    public static ProjectFixtureBuilder anyProject() {
        return new ProjectFixtureBuilder();
    }

    /**
     * Sets the title for the project being built.
     *
     * @param title the project title to use
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder title(String title) {
        this.title = title;
        return this;
    }

    /**
     * Sets the summary for the project and returns the builder for chaining.
     *
     * @param summary the summary text to set
     * @return this builder instance
     */
    public ProjectFixtureBuilder summary(String summary) {
        this.summary = summary;
        return this;
    }

    /**
     * Sets the description for the project and returns the builder for chaining.
     *
     * @param description the project description to set
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder description(String description) {
        this.description = description;
        return this;
    }

    /**
     * Sets the GitHub URL for the project.
     *
     * @param githubUrl the GitHub repository URL to associate with the project
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder githubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
        return this;
    }

    /**
     * Sets the production URL for the project.
     *
     * @param productionUrl the URL where the project is deployed
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder productionUrl(String productionUrl) {
        this.productionUrl = productionUrl;
        return this;
    }

    /**
     * Sets the project's images using the provided image URLs.
     *
     * @param imageUrls one or more image URLs to associate with the project
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder images(String... imageUrls) {
        this.images = new Images(Arrays.asList(imageUrls));
        return this;
    }

    /**
     * Sets the organization for the project and returns the builder for chaining.
     *
     * @param organization the organization to associate with the project
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    /**
     * Sets the author of the project.
     *
     * @param author the member to assign as the project's author
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder author(Member author) {
        this.author = author;
        return this;
    }

    /**
     * Sets the tech stacks for the project using the provided values.
     *
     * @param techStacks one or more tech stack instances to associate with the project
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder techStacks(TechStack... techStacks) {
        this.techStacks = new ArrayList<>(Arrays.asList(techStacks));
        return this;
    }

    /**
     * Sets the categories for the project and returns the builder for chaining.
     *
     * @param categories one or more categories to associate with the project
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder categories(Category... categories) {
        this.categories = new ArrayList<>(Arrays.asList(categories));
        return this;
    }

    /**
     * Sets the platforms for the project and returns the builder for chaining.
     *
     * @param platforms one or more platforms to associate with the project
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder platforms(Platform... platforms) {
        this.platforms = new ArrayList<>(Arrays.asList(platforms));
        return this;
    }

    /**
     * Sets the creation timestamp for the project being built.
     *
     * @param createdAt the desired creation date and time
     * @return this builder instance for method chaining
     */
    public ProjectFixtureBuilder createdAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    /**
     * Constructs and returns a new {@code Project} instance using the current state of the builder's fields.
     *
     * @return a {@code Project} object populated with the configured attributes
     */
    public Project build() {
        return new Project(
                this.title,
                this.summary,
                this.description,
                this.githubUrl,
                this.productionUrl,
                this.images,
                this.organization,
                this.author,
                this.techStacks,
                this.categories,
                this.platforms,
                this.createdAt
        );
    }
}
