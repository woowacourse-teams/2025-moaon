package moaon.backend.article.domain;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import moaon.backend.global.cursor.Cursor;

@RequiredArgsConstructor
@Getter
@ToString
public class Articles {

    private final List<Article> articles;
    private final long totalCount;
    private final int limit;

    public List<Article> getArticlesToReturn() {
        if (hasNext()) {
            return articles.subList(0, limit);
        }

        return articles;
    }

    public Cursor<?> getNextCursor(ArticleSortType sortType) {
        if (hasNext()) {
            List<Article> articlesToReturn = getArticlesToReturn();
            Article lastArticle = articlesToReturn.getLast();
            return sortType.toCursor(lastArticle);
        }

        return null;
    }

    public boolean hasNext() {
        return articles.size() > limit;
    }
}
