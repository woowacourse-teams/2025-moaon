package moaon.backend.article.repository.es;

import static moaon.backend.article.domain.ArticleSortType.CREATED_AT;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.RefreshPolicy;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;

class ArticleDocumentRepositoryTest {

    private final ElasticsearchOperations ops = mock(ElasticsearchOperations.class);
    private final ArticleDocumentRepository repository = new ArticleDocumentRepository(ops);

    @DisplayName("검색 조건을 받아 <articles> 인덱스에 검색 요청을 수행한다.")
    @Test
    void search() {
        // given
        ArticleQueryCondition condition = new ArticleQueryConditionBuilder().sortBy(CREATED_AT).build();

        // when
        repository.search(condition);

        // then
        verify(ops).search(any(NativeQuery.class), eq(ArticleDocument.class), eq(IndexCoordinates.of("articles")));
    }

    @DisplayName("문서를 저장할 때 즉시 새로고침 전략으로 <articles> 인덱스에 저장 요청을 수행한다.")
    @Test
    void save() {
        // given
        ArticleDocument doc = new ArticleDocument(new ArticleFixtureBuilder().build());
        when(ops.withRefreshPolicy(any(RefreshPolicy.class))).thenReturn(ops);

        // when
        repository.save(doc);

        // then
        verify(ops).withRefreshPolicy(RefreshPolicy.IMMEDIATE);
        verify(ops).save(doc, IndexCoordinates.of("articles"));
    }
}
