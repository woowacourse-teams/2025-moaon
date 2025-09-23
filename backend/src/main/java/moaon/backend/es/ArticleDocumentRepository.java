package moaon.backend.es;

import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ArticleDocumentRepository extends
        CustomizedArticleDocumentRepository,
        ElasticsearchRepository<ArticleDocument, Long> {

}

interface CustomizedArticleDocumentRepository {

    SearchHits<ArticleDocument> search(ArticleESQuery condition);
}
