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
import moaon.backend.project.domain.Project;
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
        return wrapSearchHits(condition, searchHits);
    }

    public ArticleSearchResult searchInProject(Project project, ArticleQueryCondition condition) {
        List<Long> articleIds = project.getArticleIds();
        SearchHits<ArticleDocument> searchHits = elasticSearch.searchInIds(articleIds, condition);
        return wrapSearchHits(condition, searchHits);
    }

    public ArticleDocument save(ArticleDocument articleDocument) {
        return elasticSearch.save(articleDocument);
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

    private ArticleSearchResult wrapSearchHits(
            ArticleQueryCondition condition,
            SearchHits<ArticleDocument> searchHits
    ) {
        return new ESArticleSearchResult(
                searchHits,
                getOriginArticles(searchHits),
                condition.limit()
        );
    }
}
