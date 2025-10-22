package moaon.backend.article.domain;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@ToString
public class Articles {

    private final List<Article> articles;
    private final long totalCount;
    private final int limit;
    private final ArticleSortType sortType;

    public static Articles empty() {
        return new Articles(List.of(), 0, 0, null);
    }

    public List<Article> getArticlesToReturn() {
        if (hasNext()) {
            return articles.subList(0, limit);
        }

        return articles;
    }

    public ArticleCursor getNextCursor() {
        if (hasNext()) {
            List<Article> articlesToReturn = getArticlesToReturn();
            Article lastArticle = articlesToReturn.getLast();
            return new ArticleCursor(lastArticle, sortType);
        }

        return null;
    }

    public boolean hasNext() {
        return articles.size() > limit;
    }
}
