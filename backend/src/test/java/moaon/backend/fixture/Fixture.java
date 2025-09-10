package moaon.backend.fixture;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import moaon.backend.article.domain.Sector;
import moaon.backend.member.domain.Member;
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.techStack.domain.TechStack;

public class Fixture {

    private static final AtomicLong SEQUENCE = new AtomicLong(0L);

    public static Member anyMember() {
        return new Member(nameWithSequence("testMember"));
    }

    public static TechStack anyTechStack() {
        return new TechStack(nameWithSequence("testTechStack"));
    }

    public static ProjectCategory anyProjectCategory() {
        return new ProjectCategory(nameWithSequence("testProjectCategory"));
    }

    public static Sector anySector() {
        return Sector.values()[new Random().nextInt(Sector.values().length)];
    }

    protected static String nameWithSequence(String name) {
        return name + SEQUENCE.incrementAndGet();
    }
}
