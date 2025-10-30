package moaon.backend.article.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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
import moaon.backend.article.repository.ArticleRepositoryFacade;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventAction;
import moaon.backend.event.repository.EsEventOutboxRepository;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.db.ArticleContentRepository;
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

    private final ArticleRepositoryFacade articleRepositoryFacade;
    private final ArticleContentRepository articleContentRepository;
    private final ProjectRepository projectRepository;
    private final TechStackRepository techStackRepository;
    private final EsEventOutboxRepository outboxRepository;
    private final ObjectMapper objectMapper;

    public ArticleResponse getPagedArticles(ArticleQueryCondition queryCondition) {
        ArticleSearchResult result = articleRepositoryFacade.search(queryCondition);
        return ArticleResponse.from(result);
    }

    public ProjectArticleResponse getByProjectId(long id, ProjectArticleQueryCondition condition) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));

        ArticleSearchResult filteredArticles = articleRepositoryFacade.searchInProject(project, condition);
        Map<Sector, Long> articleCountBySector = project.countArticlesGroupBySector();
        return ProjectArticleResponse.of(filteredArticles.getArticles(), articleCountBySector);
    }

    @Transactional
    public void increaseClicksCount(long id) {
        Article article = articleRepositoryFacade.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTICLE_NOT_FOUND));
        article.addClickCount();
        articleRepositoryFacade.updateClicksCount(article);
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

            articleRepositoryFacade.save(article);
        }
    }
}
