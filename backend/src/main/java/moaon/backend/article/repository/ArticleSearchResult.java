package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCursor;

public interface ArticleSearchResult {

    List<Article> getArticles();

    long getTotalCount();

    boolean hasNext();

    ArticleCursor getNextCursor();
}
