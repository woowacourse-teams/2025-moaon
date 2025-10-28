package moaon.backend.article.repository.es;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.db.ArticleDBRepository;
import moaon.backend.project.domain.Project;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleDocumentRepository {

    private final ArticleDocumentOperations documentOperations;
    private final ArticleDBRepository database;

    public ArticleSearchResult search(ArticleQueryCondition condition) {
        SearchHits<ArticleDocument> searchHits = documentOperations.search(condition);
        return wrapSearchHits(condition, searchHits);
    }

    public ArticleSearchResult searchInProject(Project project, ArticleQueryCondition condition) {
        List<Long> articleIds = project.getArticleIds();
        SearchHits<ArticleDocument> searchHits = documentOperations.searchInIds(articleIds, condition);
        return wrapSearchHits(condition, searchHits);
    }

    public ArticleDocument save(ArticleDocument articleDocument) {
        return documentOperations.save(articleDocument);
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
