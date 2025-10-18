package moaon.backend.article.repository.es;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleESQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.RefreshPolicy;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleDocumentRepository {

    private final ElasticsearchOperations ops;

    public SearchHits<ArticleDocument> search(ArticleESQuery condition) {
        NativeQuery esArticleQuery = new ESArticleQueryBuilder()
                .withTextSearch(condition.search())
                .withSector(condition.sector())
                .withTechStacksAndMatch(condition.techStackNames())
                .withTopicsAndMatch(condition.topics())
                .withSort(condition.sortBy())
                .withPagination(condition.limit(), condition.cursor())
                .build();
        return ops.search(esArticleQuery, ArticleDocument.class);
    }

    public ArticleDocument save(final ArticleDocument articleDocument) {
        return ops.withRefreshPolicy(RefreshPolicy.IMMEDIATE).save(articleDocument);
    }
}
