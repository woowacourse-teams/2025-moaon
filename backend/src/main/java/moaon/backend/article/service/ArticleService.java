package moaon.backend.article.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleContent;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Articles;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.dto.ArticleESQuery;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.repository.ArticleContentRepository;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventAction;
import moaon.backend.event.repository.EsEventOutboxRepository;
import moaon.backend.global.cursor.Cursor;
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

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleDocumentRepository articleDocumentRepository;
    private final ArticleRepository articleRepository;
    private final ArticleContentRepository articleContentRepository;
    private final ProjectRepository projectRepository;
    private final TechStackRepository techStackRepository;
    private final EsEventOutboxRepository outboxRepository;
    private final ObjectMapper objectMapper;

    public ArticleResponse getPagedArticles(ArticleQueryCondition queryCondition) {
        Articles articles = articleRepository.findWithSearchConditions(queryCondition);

        List<Article> articlesToReturn = articles.getArticlesToReturn();
        long totalCount = articles.getTotalCount();
        boolean hasNext = articles.hasNext();
        Cursor<?> nextCursor = articles.getNextCursor();

        return ArticleResponse.from(articlesToReturn, totalCount, hasNext, nextCursor);
    }

    public ProjectArticleResponse getByProjectId(long id, ProjectArticleQueryCondition condition) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));

        List<Article> allArticlesInProject = project.getArticles();
        List<Long> retrievedIds = retrieveInGivenArticles(allArticlesInProject, condition);
        List<Article> filteredArticles = allArticlesInProject.stream().filter(a -> retrievedIds.contains(a.getId()))
                .toList();

        Map<Sector, Long> articleCountBySector = allArticlesInProject.stream()
                .collect(Collectors.groupingBy(Article::getSector, Collectors.counting()));
        for (Sector sector : Sector.values()) {
            articleCountBySector.computeIfAbsent(sector, k -> 0L);
        }
        return ProjectArticleResponse.of(filteredArticles, articleCountBySector);
    }

    private List<Long> retrieveInGivenArticles(List<Article> allArticlesInProject,
                                               ProjectArticleQueryCondition condition) {
        ArticleESQuery esQuery = ArticleESQuery.builder()
                .search(condition.search())
                .sector(condition.sector())
                .sortBy(ArticleSortType.CREATED_AT)
                .limit(999)
                .build();

        List<Long> allArticleIds = allArticlesInProject.stream().map(Article::getId).toList();
        return articleDocumentRepository.searchInIds(allArticleIds, esQuery)
                .stream()
                .map(ArticleDocument::getId)
                .toList();
    }

    @Transactional
    public void increaseClicksCount(long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTICLE_NOT_FOUND));
        article.addClickCount();

        EsEventOutbox outboxEvent = EsEventOutbox.builder()
                .entityId(article.getId())
                .eventType(Article.class.getSimpleName())
                .action(EventAction.UPDATED)
                .payload(convertToJson(new ArticleDocument(article)))
                .build();
        outboxRepository.save(outboxEvent);
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
            EsEventOutbox outboxEvent = EsEventOutbox.builder()
                    .entityId(article.getId())
                    .eventType(Article.class.getSimpleName())
                    .action(EventAction.INSERT)
                    .payload(convertToJson(new ArticleDocument(article)))
                    .build();

            outboxRepository.save(outboxEvent);
        }
    }
    private String convertToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.ARTICLE_PROCESSING_FAILED);
        }
    }
}
