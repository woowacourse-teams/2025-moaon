package moaon.backend.article.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.dto.Cursor;
import moaon.backend.article.dto.CursorParser;
import moaon.backend.article.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleResponse getPagedArticles(ArticleQueryCondition queryCondition) {
        List<Article> articles = articleRepository.findWithSearchConditions(queryCondition);
        long totalCount = articleRepository.count();

        if (articles.size() > queryCondition.limit()) {
            List<Article> articlesToReturn = articles.subList(0, queryCondition.limit());
            Article lastArticle = articles.getLast();

            Cursor<?> cursor = CursorParser.toCursor(lastArticle, queryCondition.sortBy());

            return ArticleResponse.from(
                    articlesToReturn,
                    totalCount,
                    true,
                    cursor.getNextCursor());
        }

        return ArticleResponse.from(articles, totalCount, false, "");
    }
}
