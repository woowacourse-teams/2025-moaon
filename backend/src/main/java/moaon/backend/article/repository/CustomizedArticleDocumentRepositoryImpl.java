package moaon.backend.article.repository;

import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CustomizedArticleDocumentRepositoryImpl implements CustomizedArticleDocumentRepository {

    private final ElasticsearchOperations ops;

    @Override
    public List<ArticleDocument> search(final SearchKeyword keyword) {
        final var word = keyword.value();

        final var query = MultiMatchQuery.of(m -> m
                .query(word)
                .fields("title^3", "summary^2", "content^1")
        )._toQuery();

        final var searchHits = sendQuery(query);
        log.trace("Search hits for keyword : {}, {}", word, searchHits);
        return searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();
    }

    private SearchHits<ArticleDocument> sendQuery(final Query query) {
        final var nativeQuery = NativeQuery.builder()
                .withQuery(query)
                .build();

        return ops.search(nativeQuery, ArticleDocument.class);
    }
}
