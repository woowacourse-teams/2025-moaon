package moaon.backend.article.repository;

import static moaon.backend.article.domain.ArticleSortType.CREATED_AT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
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
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
class ArticleRepositoryFacadeTest {

    @Autowired
    private ArticleRepositoryFacade articleRepositoryFacade;

    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;

    @MockitoBean
    private ArticleDocumentRepository documentRepository;

    @MockitoBean
    private ArticleDBRepository articleDBRepository;

    @MockitoBean
    private EventOutboxRepository outboxRepository;

    @MockitoBean
    private ProjectRepository projectRepository;

    private final ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder().sortBy(CREATED_AT).build();

    @AfterEach
    public void resetCircuitBreaker() {
        circuitBreakerRegistry.circuitBreaker("articleSearchEs").reset();
    }

    @DisplayName("ElasticSearch Repository에서 먼저 검색한다.")
    @Test
    void getPagedArticlesElasticSearchFirst() {
        // given
        ArticleSearchResult esResult = mock(ArticleSearchResult.class);
        when(documentRepository.search(queryCondition)).thenReturn(esResult);

        // when
        ArticleSearchResult result = articleRepositoryFacade.search(queryCondition);

        // then
        assertThat(result).isSameAs(esResult);
        verify(documentRepository).search(queryCondition);
        verifyNoInteractions(articleDBRepository);
    }

    @DisplayName("ES 검색이 실패하면 DB로 fallback 한다.")
    @Test
    void fallbackToDBWhenEsThrowsRecordedException() {
        // given
        when(documentRepository.search(queryCondition)).thenThrow(new RuntimeException("ES timeout"));

        ArticleSearchResult dbResult = mock(ArticleSearchResult.class);
        when(articleDBRepository.findWithSearchConditions(queryCondition)).thenReturn(dbResult);

        // when
        ArticleSearchResult result = articleRepositoryFacade.search(queryCondition);

        // then
        assertThat(result).isSameAs(dbResult);
        verify(documentRepository).search(queryCondition);
        verify(articleDBRepository).findWithSearchConditions(queryCondition);
    }

    @DisplayName("CircuitBreaker가 OPEN이면 ES 호출 없이 DB로 fallback 한다.")
    @Test
    void fallbackToDBWhenCircuitBreakerOpen() {
        // given
        CircuitBreaker cb = circuitBreakerRegistry.circuitBreaker("articleSearchEs");
        cb.transitionToOpenState();

        ArticleSearchResult dbResult = mock(ArticleSearchResult.class);
        when(articleDBRepository.findWithSearchConditions(queryCondition))
                .thenReturn(dbResult);

        // when
        ArticleSearchResult result = articleRepositoryFacade.search(queryCondition);

        // then
        assertThat(result).isSameAs(dbResult);
        verify(articleDBRepository).findWithSearchConditions(queryCondition);
        verifyNoInteractions(documentRepository);
    }

    @DisplayName("프로젝트 ID로 검색 시 ES에서 해당 프로젝트로 한정지어서 검색한다.")
    @Test
    void getByProjectId_success() {
        Project project = new ProjectFixtureBuilder().id(1L).build();
        ProjectArticleQueryCondition pac = new ProjectArticleQueryCondition(Sector.BE, new SearchKeyword("검색어"));

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(documentRepository.searchInProject(eq(project), eq(pac.toArticleCondition())))
                .thenReturn(mock(ArticleSearchResult.class));

        // when
        articleRepositoryFacade.searchInProject(project, pac);

        // then
        verify(documentRepository).searchInProject(eq(project), eq(pac.toArticleCondition()));
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
