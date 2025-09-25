package moaon.backend.es;

import org.springframework.data.elasticsearch.core.SearchHits;

public interface ArticleDocumentRepository {
    SearchHits<ArticleDocument> search(ArticleESQuery query);

    ArticleDocument save(ArticleDocument articleDocument);
}
