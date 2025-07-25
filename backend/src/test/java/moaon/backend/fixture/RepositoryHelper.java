package moaon.backend.fixture;

import moaon.backend.category.repository.CategoryRepository;
import moaon.backend.member.repository.MemberRepository;
import moaon.backend.organization.repository.OrganizationRepository;
import moaon.backend.platform.repository.PlatformRepository;
import moaon.backend.project.domain.Project;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.repository.TechStackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestComponent;

@TestComponent
public class RepositoryHelper {

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

    public Project save(Project project) {
        organizationRepository.save(project.getOrganization());
        memberRepository.save(project.getAuthor());
        techStackRepository.saveAll(project.getTechStacks());
        categoryRepository.saveAll(project.getCategories());
        platformRepository.saveAll(project.getPlatforms());

        return projectRepository.save(project);
    }
}
