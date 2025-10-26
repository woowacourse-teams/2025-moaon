package moaon.backend.article.repository.db;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.repository.ArticleSearchResult;

@RequiredArgsConstructor
@Getter
@ToString
public class DBArticleSearchResult implements ArticleSearchResult {

    /**
     * limit + 1개를 조회한 결과로 만들어야 합니다.
     */
    private final List<Article> articles;
    private final long totalCount;
    private final int limit;
    private final ArticleSortType sortType;

    @Override
    public List<Article> getArticles() {
        if (hasNext()) {
            return articles.subList(0, limit);
        }

        return articles;
    }

    @Override
    public boolean hasNext() {
        return articles.size() > limit;
    }

    @Override
    public ArticleCursor getNextCursor() {
        if (hasNext()) {
            return generateCursor();
        }
        return null;
    }

    private ArticleCursor generateCursor() {
        Article lastArticle = getArticles().getLast();
        Long lastId = lastArticle.getId();

        if (ArticleSortType.CREATED_AT == sortType) {
            return new ArticleCursor(lastArticle.getCreatedAt(), lastId);
        }

        if (ArticleSortType.CLICKS == sortType) {
            return new ArticleCursor(lastArticle.getClicks(), lastId);
        }

        if (ArticleSortType.RELEVANCE == sortType) {
            return new ArticleCursor(lastArticle.getScore(), lastId);
        }

        return null;
    }

    public static DBArticleSearchResult empty() {
        return new DBArticleSearchResult(List.of(), 0, 0, null);
    }
}
