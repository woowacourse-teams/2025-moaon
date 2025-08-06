package moaon.backend.fixture;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCategory;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

public class ArticleFixtureBuilder {

    private Long id;
    private String title;
    private String summary;
    private String content;
    private String articleUrl;
    private LocalDateTime createdAt;
    private Project project;
    private ArticleCategory category;
    private List<TechStack> techStacks;
    private int clicks;

    public ArticleFixtureBuilder() {
        this.title = Fixture.nameWithSequence("테스트 아티클 제목");
        this.summary = Fixture.nameWithSequence("테스트 아티클 요약");
        this.content = Fixture.nameWithSequence("테스트 아티클 본문");
        this.articleUrl = "https://test-product.com";
        this.createdAt = LocalDateTime.now();
        this.project = new ProjectFixtureBuilder().build();
        this.category = Fixture.anyArticleCategory();
        this.techStacks = new ArrayList<>(List.of(Fixture.anyTechStack()));
        this.clicks = 0;
    }

    public ArticleFixtureBuilder id(Long id) {
        this.id = id;
        return this;
    }

    public ArticleFixtureBuilder title(String title) {
        this.title = title;
        return this;
    }

    public ArticleFixtureBuilder summary(String summary) {
        this.summary = summary;
        return this;
    }

    public ArticleFixtureBuilder content(String content) {
        this.content = content;
        return this;
    }

    public ArticleFixtureBuilder articleUrl(String articleUrl) {
        this.articleUrl = articleUrl;
        return this;
    }

    public ArticleFixtureBuilder techStacks(List<TechStack> techStacks) {
        this.techStacks = techStacks;
        return this;
    }

    public ArticleFixtureBuilder category(ArticleCategory category) {
        this.category = category;
        return this;
    }

    public ArticleFixtureBuilder project(Project project) {
        this.project = project;
        return this;
    }

    public ArticleFixtureBuilder createdAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public ArticleFixtureBuilder clicks(int clicks) {
        this.clicks = clicks;
        return this;
    }

    public Article build() {
        return Article.builder()
                .id(this.id)
                .title(this.title)
                .summary(this.summary)
                .content(this.content)
                .articleUrl(this.articleUrl)
                .clicks(this.clicks)
                .createdAt(this.createdAt)
                .project(this.project)
                .category(this.category)
                .techStacks(this.techStacks)
                .build();
    }
}
