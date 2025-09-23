package moaon.backend.article.repository;

import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleQueryCondition;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ArticleDocumentRepository extends
        CustomizedArticleDocumentRepository,
        ElasticsearchRepository<ArticleDocument, String> {

}

interface CustomizedArticleDocumentRepository {

    SearchHits<ArticleDocument> search(ArticleQueryCondition condition);
}
