package moaon.backend.article.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.db.ArticleRepository;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.article.repository.es.ESArticleSearchResult;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ElasticSearchService {

    private final ArticleDocumentRepository elasticSearch;
    private final ArticleRepository database;

    public ArticleSearchResult search(ArticleQueryCondition condition) {
        SearchHits<ArticleDocument> searchHits = elasticSearch.search(condition);
        List<Article> originArticles = getOriginArticles(searchHits);

        return new ESArticleSearchResult(
                searchHits,
                originArticles,
                condition.limit()
        );
    }

    private List<Article> getOriginArticles(SearchHits<ArticleDocument> searchHits) {
        List<Long> ids = searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .map(ArticleDocument::getId)
                .toList();

        return database.findAllById(ids)
                .stream()
                .sorted(Comparator.comparingInt(a -> ids.indexOf(a.getId())))
                .toList();
    }
}
