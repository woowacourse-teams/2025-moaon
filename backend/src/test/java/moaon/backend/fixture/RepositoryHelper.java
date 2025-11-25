package moaon.backend.fixture;

import moaon.backend.article.domain.Article;
import moaon.backend.article.repository.db.ArticleDBRepository;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import moaon.backend.project.domain.Category;
import moaon.backend.project.domain.Project;
import moaon.backend.project.repository.CategoryRepository;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.domain.TechStack;
import moaon.backend.techStack.repository.TechStackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestComponent;

@TestComponent
public class RepositoryHelper {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TechStackRepository techStackRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ArticleDBRepository articleDBRepository;

    public Project save(Project project) {
        memberRepository.save(project.getAuthor());
        techStackRepository.saveAll(project.getTechStacks());
        categoryRepository.saveAll(project.getCategories());

        return projectRepository.save(project);
    }

    public Article save(Article article) {
        techStackRepository.saveAll(article.getTechStacks());
        save(article.getProject());

        return articleDBRepository.save(article);
    }

    public Member save(Member member) {
        return memberRepository.save(member);
    }

    public Article getById(long id) {
        return articleDBRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("테스트 실패"));
    }

    public TechStack save(TechStack techStack) {
        return techStackRepository.save(techStack);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }
}
