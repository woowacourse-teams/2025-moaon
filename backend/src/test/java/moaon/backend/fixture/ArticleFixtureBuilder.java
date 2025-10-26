package moaon.backend.fixture;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
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
    private Sector sector;
    private List<Topic> topics;
    private List<TechStack> techStacks;
    private int clicks;
    private double score;

    public ArticleFixtureBuilder() {
        this.title = Fixture.nameWithSequence("테스트 아티클 제목");
        this.summary = Fixture.nameWithSequence("테스트 아티클 요약");
        this.content = Fixture.nameWithSequence("테스트 아티클 본문");
        this.articleUrl = "https://test-product.com";
        this.createdAt = LocalDateTime.now();
        this.project = new ProjectFixtureBuilder().build();
        this.sector = Fixture.randomSector();
        this.topics = new ArrayList<>(List.of(Topic.ETC));
        this.techStacks = new ArrayList<>(List.of(Fixture.anyTechStack()));
        this.clicks = 0;
        this.score = 0.0;
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

    public ArticleFixtureBuilder techStacks(TechStack... techStacks) {
        this.techStacks = Arrays.asList(techStacks);
        return this;
    }

    public ArticleFixtureBuilder sector(Sector sector) {
        this.sector = sector;
        return this;
    }

    public ArticleFixtureBuilder topics(Topic... topics) {
        this.topics = Arrays.asList(topics);
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

    public ArticleFixtureBuilder score(double score) {
        this.score = score;
        return this;
    }

    public Article build() {
        Article article = Article.builder()
                .id(this.id)
                .title(this.title)
                .summary(this.summary)
                .content(this.content)
                .articleUrl(this.articleUrl)
                .clicks(this.clicks)
                .createdAt(this.createdAt)
                .project(this.project)
                .sector(this.sector)
                .topics(this.topics)
                .techStacks(new ArrayList<>())
                .build();

        for (TechStack techStack : techStacks) {
            article.addTechStack(techStack);
        }

        return article;
    }
}
