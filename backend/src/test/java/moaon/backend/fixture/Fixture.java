package moaon.backend.fixture;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.member.domain.Member;
import moaon.backend.project.domain.Category;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;

public class Fixture {

    private static final AtomicLong SEQUENCE = new AtomicLong(0L);

    public static Project anyProject() {
        return new ProjectFixtureBuilder()
                .id(SEQUENCE.getAndIncrement())
                .title(nameWithSequence("프로젝트"))
                .summary("프로젝트 요약문입니다.".repeat(2))
                .description("충분히 긴 설명입니다.".repeat(15))
                .githubUrl("https://github.com/moaon")
                .productionUrl("https://moaon.site")
                .images("image.png")
                .author(anyMember())
                .techStacks(anyTechStack(), anyTechStack())
                .categories(anyProjectCategory())
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static Article anyArticle(Project project) {
        Sector sector = randomSector();
        return new ArticleFixtureBuilder()
                .id(SEQUENCE.getAndIncrement())
                .title(nameWithSequence("아티클"))
                .summary("프로젝트 요약문입니다.".repeat(2))
                .content("충분히 긴 내용입니다.".repeat(15))
                .articleUrl("https://tempdev.tistory.com/19")
                .clicks(new Random().nextInt())
                .techStacks(anyTechStack(), anyTechStack())
                .sector(sector)
                .topics(sector.getTopics().getFirst())
                .createdAt(LocalDateTime.now())
                .project(project)
                .build();
    }

    public static Article anyArticle() {
        return anyArticle(anyProject());
    }

    public static Member anyMember() {
        return new Member(
                socialIdWithSequence("testSocialId"),
                emailWithSequence("testEmail@gmail.com"),
                nameWithSequence("testMember")
        );
    }

    public static TechStack anyTechStack() {
        return new TechStack(nameWithSequence("testTechStack"));
    }

    public static Category anyProjectCategory() {
        return new Category(nameWithSequence("testProjectCategory"));
    }

    public static Sector randomSector() {
        return Sector.values()[new Random().nextInt(Sector.values().length)];
    }

    protected static String nameWithSequence(String name) {
        return name + SEQUENCE.incrementAndGet();
    }

    protected static String emailWithSequence(String email) {
        return email + SEQUENCE.incrementAndGet();
    }

    protected static String socialIdWithSequence(String socialId) {
        return socialId + SEQUENCE.incrementAndGet();
    }
}
