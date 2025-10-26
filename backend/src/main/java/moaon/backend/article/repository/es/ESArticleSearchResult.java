package moaon.backend.article.repository.es;

import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.ArticleSearchResult;
import org.springframework.data.elasticsearch.core.SearchHits;

@RequiredArgsConstructor
public class ESArticleSearchResult implements ArticleSearchResult {

    private final SearchHits<ArticleDocument> searchHits;
    private final List<Article> originArticles;
    private final int limit;

    @Override
    public List<Article> getArticles() {
        return Collections.unmodifiableList(originArticles);
    }

    @Override
    public ArticleCursor getNextCursor() {
        if (!hasNext()) {
            return null;
        }

        List<Object> sortValues = searchHits.getSearchHits().getLast().getSortValues();
        return new ArticleCursor(sortValues.get(0), (long) sortValues.get(1));
    }

    @Override
    public long getTotalCount() {
        return searchHits.getTotalHits();
    }

    @Override
    public boolean hasNext() {
        return getArticles().size() == limit;
    }
}
