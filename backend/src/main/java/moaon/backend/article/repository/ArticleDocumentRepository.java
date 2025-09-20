package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ArticleDocumentRepository extends
        CustomizedArticleDocumentRepository,
        ElasticsearchRepository<ArticleDocument, String> {

}

interface CustomizedArticleDocumentRepository {

    List<ArticleDocument> search(SearchKeyword keyword);
}
