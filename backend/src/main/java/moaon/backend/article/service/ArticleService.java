package moaon.backend.article.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.dto.Cursor;
import moaon.backend.article.dto.CursorParser;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ProjectRepository projectRepository;

    public ArticleResponse getPagedArticles(ArticleQueryCondition queryCondition) {
        List<Article> articles = articleRepository.findWithSearchConditions(queryCondition);
        long totalCount = articleRepository.count();

        if (articles.size() > queryCondition.limit()) {
            List<Article> articlesToReturn = articles.subList(0, queryCondition.limit());
            Article lastArticle = articlesToReturn.getLast();

            Cursor<?> cursor = CursorParser.toCursor(lastArticle, queryCondition.sortBy());

            return ArticleResponse.from(
                    articlesToReturn,
                    totalCount,
                    true,
                    cursor.getNextCursor());
        }

        return ArticleResponse.from(articles, totalCount, false, null);
    }

    public List<ArticleDetailResponse> getByProjectId(long id) {
        projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));
        List<Article> articles = articleRepository.findAllByProjectId(id);
        return ArticleDetailResponse.from(articles);
    }

    @Transactional
    public void increaseClicksCount(long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTICLE_NOT_FOUND));
        article.addClickCount();
    }
}
