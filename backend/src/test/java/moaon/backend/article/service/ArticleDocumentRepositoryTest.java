package moaon.backend.article.service;

import static moaon.backend.article.domain.ArticleSortType.CREATED_AT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.db.ArticleDBRepository;
import moaon.backend.article.repository.es.ArticleDocumentOperations;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.article.repository.es.ESArticleSearchResult;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import moaon.backend.project.domain.Project;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.elasticsearch.core.SearchHits;

class ArticleDocumentRepositoryTest {

    private final ArticleDocumentOperations documentOperations = Mockito.mock(ArticleDocumentOperations.class);
    private final ArticleDBRepository databaseRepository = Mockito.mock(ArticleDBRepository.class);
    private final ArticleDocumentRepository service = new ArticleDocumentRepository(documentOperations,
            databaseRepository);

    private final ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder().sortBy(CREATED_AT).build();

    @DisplayName("검색 요청 시 Elasticsearch에서 결과를 가져와 ArticleSearchResult로 감싼다.")
    @Test
    void search() {
        // given
        when(documentOperations.search(queryCondition)).thenReturn(mock(SearchHits.class));

        // when
        ArticleSearchResult result = service.search(queryCondition);

        // then
        assertThat(result).isInstanceOf(ArticleSearchResult.class);
        verify(documentOperations).search(queryCondition);
    }

    @DisplayName("프로젝트의 아티클 검색 시 프로젝트의 아티클 ID 목록을 Elasticsearch에 전달한다.")
    @Test
    void searchInProject() {
        // given
        Project project = Project.builder().id(99L)
                .articles(List.of(
                        new ArticleFixtureBuilder().id(1L).build(),
                        new ArticleFixtureBuilder().id(2L).build())
                ).build();

        when(documentOperations.searchInIds(List.of(1L, 2L), queryCondition)).thenReturn(mock(SearchHits.class));

        // when
        ArticleSearchResult result = service.searchInProject(project, queryCondition);

        // then
        assertThat(result).isInstanceOf(ESArticleSearchResult.class);
        verify(documentOperations).searchInIds(List.of(1L, 2L), queryCondition);
    }

    @DisplayName("ArticleDocument 저장 요청을 위임한다.")
    @Test
    void save() {
        // given
        ArticleDocument document = new ArticleDocument(new ArticleFixtureBuilder().build());

        // when
        service.save(document);

        // then
        verify(documentOperations).save(document);
    }
}
