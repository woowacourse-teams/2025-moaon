package moaon.backend.article.repository.es;

import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.service.ESArticleQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.RefreshPolicy;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleDocumentRepositoryImpl implements ArticleDocumentRepository {

    private final ElasticsearchOperations ops;

    @Override
    public SearchHits<ArticleDocument> search(ESArticleQueryBuilder builder) {
        return ops.search(builder.build(), ArticleDocument.class);
    }

    @Override
    public ArticleDocument save(final ArticleDocument articleDocument) {
        return ops.withRefreshPolicy(RefreshPolicy.IMMEDIATE).save(articleDocument);
    }
}
