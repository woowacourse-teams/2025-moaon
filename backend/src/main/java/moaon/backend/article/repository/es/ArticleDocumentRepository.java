package moaon.backend.article.repository.es;

import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleESQuery;
import org.springframework.data.elasticsearch.core.SearchHits;

public interface ArticleDocumentRepository {
    SearchHits<ArticleDocument> search(ArticleESQuery query);

    ArticleDocument save(ArticleDocument articleDocument);
}
