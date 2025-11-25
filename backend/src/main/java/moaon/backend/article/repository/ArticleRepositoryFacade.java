package moaon.backend.article.repository;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.db.ArticleDBRepository;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.event.domain.EventAction;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.repository.EventOutboxRepository;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ArticleRepositoryFacade {

    private final ArticleDBRepository database;
    private final ArticleDocumentRepository elasticSearch;
    private final EventOutboxRepository outboxRepository;

    public ArticleSearchResult search(ArticleQueryCondition condition) {
        try {
            return elasticSearch.search(condition);

        } catch (Exception e) {
            log.error("검색엔진이 실패하였습니다. 데이터베이스로 검색을 시도합니다.", e);
            return database.findWithSearchConditions(condition);
        }
    }

    public ArticleSearchResult searchInProject(Project project, ProjectArticleQueryCondition condition) {
        return elasticSearch.searchInProject(project, condition.toArticleCondition());
    }

    public Optional<Article> findById(Long id) {
        return database.findById(id);
    }

    public void updateClicksCount(Article article) {
        ArticleDocument articleDocument = new ArticleDocument(article);
        EventOutbox outboxEvent = articleDocument.toEventOutbox(EventAction.UPDATED);
        outboxRepository.save(outboxEvent);
    }

    public Article save(Article article) {
        Article saved = database.save(article);
        ArticleDocument document = new ArticleDocument(saved);
        EventOutbox outboxEvent = document.toEventOutbox(EventAction.INSERT);
        outboxRepository.save(outboxEvent);
        return saved;
    }
}
