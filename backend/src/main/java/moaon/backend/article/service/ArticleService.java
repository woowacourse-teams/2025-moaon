package moaon.backend.article.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.dto.ArticleSectorCount;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleResponse;
import moaon.backend.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    public static final String ALL_SECTOR = "all";
    private final ArticleRepository articleRepository;
    private final ProjectRepository projectRepository;

    public ArticleResponse getPagedArticles(ArticleQueryCondition queryCondition) {
        List<Article> articles = articleRepository.findWithSearchConditions(queryCondition);
        long totalCount = articleRepository.countWithSearchCondition(queryCondition);

        if (articles.size() > queryCondition.limit()) {
            List<Article> articlesToReturn = articles.subList(0, queryCondition.limit());
            Article lastArticle = articlesToReturn.getLast();

            Cursor<?> articleCursor = queryCondition.sortBy().toCursor(lastArticle);

            return ArticleResponse.from(
                    articlesToReturn,
                    totalCount,
                    true,
                    articleCursor.getNextCursor());
        }

        return ArticleResponse.from(articles, totalCount, false, null);
    }

    public ProjectArticleResponse getByProjectId(long id, ProjectArticleQueryCondition condition) {
        projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));

        List<Article> articles = articleRepository.findAllByProjectIdAndCondition(id, condition);
        List<ArticleDetailResponse> data = ArticleDetailResponse.from(articles);

        List<ArticleSectorCount> count = new ArrayList<>(
                Arrays.stream(Sector.values())
                        .map(sector -> ArticleSectorCount.of(
                                sector,
                                articleRepository.countByProjectIdAndSector(id, sector)))
                        .toList()
        );

        long totalCount = count.stream()
                .mapToLong(ArticleSectorCount::count)
                .sum();
        count.addFirst(ArticleSectorCount.of(ALL_SECTOR, totalCount));

        return ProjectArticleResponse.of(count, data);
    }

    @Transactional
    public void increaseClicksCount(long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTICLE_NOT_FOUND));
        article.addClickCount();
    }
}
