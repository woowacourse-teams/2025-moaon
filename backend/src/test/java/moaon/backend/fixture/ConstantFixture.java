package moaon.backend.fixture;

import moaon.backend.category.domain.Category;
import moaon.backend.member.domain.Member;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.techStack.domain.TechStack;

public class ConstantFixture {

    public static Organization ORGANIZATION1 = new Organization("woowacourse");
    public static Organization ORGANIZATION2 = new Organization("boostcamp");
    public static Organization ORGANIZATION3 = new Organization("ssafy");
    public static Organization ORGANIZATION4 = new Organization("swm");

    public static Category CATEGORY1 = new Category("social");
    public static Category CATEGORY2 = new Category("media");
    public static Category CATEGORY3 = new Category("game");
    public static Category CATEGORY4 = new Category("ott");
    public static Category CATEGORY5 = new Category("ai");

    public static TechStack TECH_STACK1 = new TechStack("java");
    public static TechStack TECH_STACK2 = new TechStack("spring");
    public static TechStack TECH_STACK3 = new TechStack("react");
    public static TechStack TECH_STACK4 = new TechStack("aws");
    public static TechStack TECH_STACK5 = new TechStack("c");

    public static Platform PLATFORM1 = new Platform("web");
    public static Platform PLATFORM2 = new Platform("desktop");
    public static Platform PLATFORM3 = new Platform("ios");
    public static Platform PLATFORM4 = new Platform("android");

    public static Member MEMBER1 = new Member("멤버1");
    public static Member MEMBER2 = new Member("멤버2");
    public static Member MEMBER3 = new Member("멤버3");
}
