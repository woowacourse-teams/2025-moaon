package moaon.backend.article.repository.es;

import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.global.parser.LongParser;
import moaon.backend.global.parser.Parser;
import org.springframework.data.elasticsearch.core.SearchHits;

@RequiredArgsConstructor
public class ESArticleSearchResult implements ArticleSearchResult {

    private static final Parser<Long> ID_PARSER = new LongParser();

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
        Object sortValue = sortValues.get(0);
        Long id = ID_PARSER.parse(sortValues.get(1).toString());
        return new ArticleCursor(sortValue, id);
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
