package moaon.backend.article.repository.es;

import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleESQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.RefreshPolicy;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleDocumentRepository {

    private static final IndexCoordinates ARTICLE_ALIAS = IndexCoordinates.of("articles");

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
        return ops.search(esArticleQuery, ArticleDocument.class, ARTICLE_ALIAS);
    }

    public ArticleDocument save(ArticleDocument articleDocument) {
        return ops
                .withRefreshPolicy(RefreshPolicy.IMMEDIATE)
                .save(articleDocument, ARTICLE_ALIAS);
    }

    public List<ArticleDocument> searchInIds(List<Long> articleIds, ArticleESQuery condition) {
        NativeQuery esArticleQuery = new ESArticleQueryBuilder()
                .withIds(articleIds)
                .withTextSearch(condition.search())
                .withSector(condition.sector())
                .withTechStacksAndMatch(condition.techStackNames())
                .withTopicsAndMatch(condition.topics())
                .withSort(condition.sortBy())
                .withPagination(condition.limit(), condition.cursor())
                .build();

        SearchHits<ArticleDocument> searchHits = ops.search(esArticleQuery, ArticleDocument.class, ARTICLE_ALIAS);
        return searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();
    }
}
