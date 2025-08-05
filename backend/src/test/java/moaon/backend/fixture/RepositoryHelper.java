package moaon.backend.fixture;

import moaon.backend.article.domain.Article;
import moaon.backend.article.repository.ArticleCategoryRepository;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.member.repository.MemberRepository;
import moaon.backend.project.domain.Project;
import moaon.backend.project.repository.ProjectCategoryRepository;
import moaon.backend.project.repository.ProjectRepository;
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
    private ProjectCategoryRepository projectCategoryRepository;

    @Autowired
    private ArticleCategoryRepository articleCategoryRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public Project save(Project project) {
        memberRepository.save(project.getAuthor());
        techStackRepository.saveAll(project.getTechStacks());
        projectCategoryRepository.saveAll(project.getCategories());

        return projectRepository.save(project);
    }

    public Article save(Article article) {
        articleCategoryRepository.save(article.getCategory());
        techStackRepository.saveAll(article.getTechStacks());
        save(article.getProject());

        return articleRepository.save(article);
    }
}
