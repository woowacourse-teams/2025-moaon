package moaon.backend.fixture;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.category.repository.CategoryRepository;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import moaon.backend.organization.domain.Organization;
import moaon.backend.organization.repository.OrganizationRepository;
import moaon.backend.platform.domain.Platform;
import moaon.backend.platform.repository.PlatformRepository;
import moaon.backend.project.domain.Images;
import moaon.backend.project.domain.Project;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.domain.TechStack;
import moaon.backend.techStack.repository.TechStackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestComponent;

@TestComponent
public class RepositoryTestHelper {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TechStackRepository techStackRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PlatformRepository platformRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveAnyProject() {
        Organization organization = organizationRepository.save(Fixture.anyOrganization());
        Member member = memberRepository.save(Fixture.anyMember());
        TechStack techStack1 = techStackRepository.save(Fixture.anyTechStack());
        TechStack techStack2 = techStackRepository.save(Fixture.anyTechStack());
        TechStack techStack3 = techStackRepository.save(Fixture.anyTechStack());
        TechStack techStack4 = techStackRepository.save(Fixture.anyTechStack());
        Category category1 = categoryRepository.save(Fixture.anyCategory());
        Category category2 = categoryRepository.save(Fixture.anyCategory());
        Platform platform = platformRepository.save(Fixture.anyPlatform());

        return projectRepository.save(new Project(
                "제목",
                "한 줄 소개",
                "상세 설명",
                "깃허브 URL",
                "프로덕션 URL",
                new Images(List.of("이미지 URL1", "이미지 URL2")),
                organization,
                member,
                List.of(techStack1, techStack2, techStack3, techStack4),
                List.of(category1, category2),
                List.of(platform),
                LocalDateTime.now()
        ));
    }

    public Project saveProjectWithSearchConditions(
            String title,
            String summary,
            String description
    ) {
        return saveProjectWithRequiredFields(
                title,
                summary,
                description,
                Fixture.anyOrganization(),
                List.of(Fixture.anyTechStack()),
                List.of(Fixture.anyCategory()),
                List.of(Fixture.anyPlatform())
        );
    }

    public Project saveProjectWithFilterConditions(
            Organization organization,
            List<TechStack> techStacks,
            List<Category> categories,
            List<Platform> platforms
    ) {
        return saveProjectWithRequiredFields(
                "제목",
                "요약",
                "설명",
                organization,
                techStacks,
                categories,
                platforms
        );
    }

    public Project saveProjectWithRequiredFields(
            String title,
            String summary,
            String description,
            Organization organization,
            List<TechStack> techStacks,
            List<Category> categories,
            List<Platform> platforms
    ) {
        organizationRepository.save(organization);
        Member member = memberRepository.save(Fixture.anyMember());
        techStackRepository.saveAll(techStacks);
        categoryRepository.saveAll(categories);
        platformRepository.saveAll(platforms);

        return projectRepository.save(new Project(
                title,
                summary,
                description,
                "깃허브 URL",
                "프로덕션 URL",
                new Images(List.of("이미지 URL1", "이미지 URL2")),
                organization,
                member,
                techStacks,
                categories,
                platforms,
                LocalDateTime.now()
        ));
    }

    public Project saveProjectWithCreatedAt(LocalDateTime createdAt) {
        Organization organization = organizationRepository.save(Fixture.anyOrganization());
        Member member = memberRepository.save(Fixture.anyMember());
        TechStack techStack1 = techStackRepository.save(Fixture.anyTechStack());
        TechStack techStack2 = techStackRepository.save(Fixture.anyTechStack());
        TechStack techStack3 = techStackRepository.save(Fixture.anyTechStack());
        TechStack techStack4 = techStackRepository.save(Fixture.anyTechStack());
        Category category1 = categoryRepository.save(Fixture.anyCategory());
        Category category2 = categoryRepository.save(Fixture.anyCategory());
        Platform platform = platformRepository.save(Fixture.anyPlatform());

        return projectRepository.save(new Project(
                "제목",
                "한 줄 소개",
                "상세 설명",
                "깃허브 URL",
                "프로덕션 URL",
                new Images(List.of("이미지 URL1", "이미지 URL2")),
                organization,
                member,
                List.of(techStack1, techStack2, techStack3, techStack4),
                List.of(category1, category2),
                List.of(platform),
                createdAt
        ));
    }
}
