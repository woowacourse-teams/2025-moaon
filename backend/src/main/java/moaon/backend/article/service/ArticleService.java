package moaon.backend.article.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleContent;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.db.ArticleContentRepository;
import moaon.backend.article.repository.db.ArticleRepository;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleResponse;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.repository.TechStackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ElasticSearchService elasticSearchService;
    private final ArticleRepository articleRepository;
    private final ArticleContentRepository articleContentRepository;
    private final ProjectRepository projectRepository;
    private final TechStackRepository techStackRepository;

    public ArticleResponse getPagedArticles(ArticleQueryCondition queryCondition) {
        try {
            return ArticleResponse.from(elasticSearchService.search(queryCondition));
        } catch (Exception e) {
            log.warn("검색엔진이 실패하였습니다. 데이터베이스로 검색을 시도합니다.", e);
            return ArticleResponse.from(articleRepository.findWithSearchConditions(queryCondition));
        }
    }

    public ProjectArticleResponse getByProjectId(long id, ProjectArticleQueryCondition condition) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));

        ArticleQueryCondition articleCondition = condition.toArticleCondition();
        ArticleSearchResult filteredArticles = elasticSearchService.searchInProject(project, articleCondition);

        Map<Sector, Long> articleCountBySector = countArticlesGroupBySector(project);
        return ProjectArticleResponse.of(filteredArticles.getArticles(), articleCountBySector);
    }

    @Transactional
    public void increaseClicksCount(long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTICLE_NOT_FOUND));
        article.addClickCount();
    }

    @Transactional
    public void save(List<ArticleCreateRequest> requests, Member member) {
        for (ArticleCreateRequest request : requests) {
            Project project = projectRepository.findById(request.projectId()).orElseThrow(
                    () -> new CustomException(ErrorCode.PROJECT_NOT_FOUND)
            );

            if (!member.equals(project.getAuthor())) {
                throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER);
            }

            Article article = new Article(
                    request.title(),
                    request.summary(),
                    articleContentRepository.findByUrl(request.url().toString())
                            .map(ArticleContent::getContent)
                            .orElse(""),
                    request.url().toString(),
                    LocalDateTime.now(),
                    project,
                    Sector.of(request.sector()),
                    request.topics()
                            .stream()
                            .map(Topic::of)
                            .toList(),
                    request.techStacks()
                            .stream()
                            .map(techStack -> techStackRepository.findByName(techStack)
                                    .orElseThrow(() -> new CustomException(ErrorCode.TECHSTACK_NOT_FOUND)))
                            .toList()
            );

            articleRepository.save(article);
            elasticSearchService.save(new ArticleDocument(article));
        }
    }

    private Map<Sector, Long> countArticlesGroupBySector(Project project) {
        Map<Sector, Long> articleCountBySector = project.getArticles().stream()
                .collect(Collectors.groupingBy(Article::getSector, Collectors.counting()));
        for (Sector sector : Sector.values()) {
            articleCountBySector.computeIfAbsent(sector, k -> 0L);
        }
        return articleCountBySector;
    }
}
