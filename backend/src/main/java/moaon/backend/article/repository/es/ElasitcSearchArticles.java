package moaon.backend.article.repository.es;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Articles;
import org.springframework.data.elasticsearch.core.SearchHits;

public class ElasitcSearchArticles extends Articles {

    private final SearchHits<ArticleDocument> searchHits;

    public ElasitcSearchArticles(
            List<Article> articles,
            SearchHits<ArticleDocument> searchHits,
            int limit,
            ArticleSortType sortType
    ) {
        super(articles, searchHits.getTotalHits(), limit, sortType);
        this.searchHits = searchHits;
    }

    @Override
    public List<Article> getArticlesToReturn() {
        return super.getArticles();
    }

    @Override
    public ArticleCursor getNextCursor() {
        if (!hasNext()) {
            return null;
        }

        List<Object> sortValues = searchHits.getSearchHits().getLast().getSortValues();
        return new ArticleCursor(sortValues.get(0), sortValues.get(1));
    }

    @Override
    public boolean hasNext() {
        return getArticles().size() == getLimit();
    }
}
