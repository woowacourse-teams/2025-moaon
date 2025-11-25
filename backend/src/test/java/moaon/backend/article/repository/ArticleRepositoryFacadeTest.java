package moaon.backend.article.repository;

import static moaon.backend.article.domain.ArticleSortType.CREATED_AT;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.util.Optional;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.db.ArticleDBRepository;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.event.domain.EventAction;
import moaon.backend.event.domain.EventOutbox;
import moaon.backend.event.repository.EventOutboxRepository;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.project.repository.ProjectRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class ArticleRepositoryFacadeTest {

    private final ArticleDocumentRepository articleDocumentRepository = mock(ArticleDocumentRepository.class);
    private final ArticleDBRepository articleDBRepository = mock(ArticleDBRepository.class);
    private final EventOutboxRepository outboxRepository = mock(EventOutboxRepository.class);

    private final ArticleRepositoryFacade articleRepositoryFacade = new ArticleRepositoryFacade(
            articleDBRepository,
            articleDocumentRepository,
            outboxRepository
    );

    private final ProjectRepository projectRepository = Mockito.mock(ProjectRepository.class);

    private final ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder().sortBy(CREATED_AT).build();

    @DisplayName("ElasticSearch Repository에서 먼저 검색한다.")
    @Test
    void getPagedArticlesElasticSearchFirst() {
        // given
        when(articleDocumentRepository.search(queryCondition)).thenReturn(mock(ArticleSearchResult.class));

        // when
        articleRepositoryFacade.search(queryCondition);

        // then
        verify(articleDocumentRepository).search(queryCondition);
        verifyNoInteractions(articleDBRepository);
    }

    @DisplayName("ES 검색 실패 시 DB로 fallback한다.")
    @Test
    void getPagedArticlesFromDBWhenESFailed() {
        // given
        when(articleDocumentRepository.search(queryCondition)).thenThrow(new RuntimeException("ES Search Failed"));
        when(articleDBRepository.findWithSearchConditions(queryCondition)).thenReturn(mock(ArticleSearchResult.class));

        // when
        articleRepositoryFacade.search(queryCondition);

        // then
        verify(articleDocumentRepository).search(queryCondition);
        verify(articleDBRepository).findWithSearchConditions(queryCondition);
    }

    @DisplayName("프로젝트 ID로 검색 시 ES에서 해당 프로젝트로 한정지어서 검색한다.")
    @Test
    void getByProjectId_success() {
        Project project = new ProjectFixtureBuilder().id(1L).build();
        ProjectArticleQueryCondition pac = new ProjectArticleQueryCondition(Sector.BE, new SearchKeyword("검색어"));

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(articleDocumentRepository.searchInProject(eq(project), eq(pac.toArticleCondition())))
                .thenReturn(mock(ArticleSearchResult.class));

        // when
        articleRepositoryFacade.searchInProject(project, pac);

        verify(articleDocumentRepository).searchInProject(eq(project), eq(pac.toArticleCondition()));
    }

    @DisplayName("Article을 저장할 때 DB와 ES 둘 다에 저장한다.")
    @Test
    void save_createsArticleAndDocument() {
        // given
        Article article = new ArticleFixtureBuilder().build();
        when(articleDBRepository.save(eq(article))).thenReturn(article);
        ArticleDocument document = new ArticleDocument(article);
        EventOutbox outboxEvent = document.toEventOutbox(EventAction.INSERT);
        // when
        articleRepositoryFacade.save(article);

        // then
        verify(articleDBRepository).save(eq(article));
        verify(outboxRepository).save(eq(outboxEvent));
    }
}
