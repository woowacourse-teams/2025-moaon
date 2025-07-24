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

    /**
     * Creates a new Platform instance with a unique name.
     *
     * @return a Platform object whose name consists of the base string "플랫폼" and a unique sequence number
     */
    public static Platform anyPlatform() {
        return new Platform(nameWithSequence("플랫폼"));
    }

    /**
     * Returns the given base name concatenated with a unique, incremented sequence number.
     *
     * @param name the base name to which the sequence number will be appended
     * @return the base name followed by a unique sequence number
     */
    protected static String nameWithSequence(String name) {
        return name + SEQUENCE.incrementAndGet();
    }
}
