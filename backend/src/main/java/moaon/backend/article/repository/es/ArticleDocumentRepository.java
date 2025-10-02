package moaon.backend.article.repository.es;

import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.service.ESArticleQueryBuilder;
import org.springframework.data.elasticsearch.core.SearchHits;

public interface ArticleDocumentRepository {
    SearchHits<ArticleDocument> search(ESArticleQueryBuilder builder);

    ArticleDocument save(ArticleDocument articleDocument);
}
