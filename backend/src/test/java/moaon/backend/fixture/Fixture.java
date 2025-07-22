package moaon.backend.fixture;

import java.util.concurrent.atomic.AtomicLong;
import moaon.backend.category.domain.Category;
import moaon.backend.member.domain.Member;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.techStack.domain.TechStack;

public class Fixture {

    private static final AtomicLong SEQUENCE = new AtomicLong(0L);

    public static Organization anyOrganization() {
        return new Organization(nameWithSequence("그룹명"));
    }

    public static Member anyMember() {
        return new Member(nameWithSequence("멤버"));
    }

    public static TechStack anyTechStack() {
        return new TechStack(nameWithSequence("기술스택"));
    }

    public static Category anyCategory() {
        return new Category(nameWithSequence("카테고리"));
    }

    public static Platform anyPlatform() {
        return new Platform(nameWithSequence("플랫폼"));
    }

    private static String nameWithSequence(String name) {
        return name + SEQUENCE.incrementAndGet();
    }
}
