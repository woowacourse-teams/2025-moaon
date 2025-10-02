package moaon.backend.article.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Articles;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
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

    private final ArticleRepository articleRepository;
    private final ProjectRepository projectRepository;

    public ArticleResponse getPagedArticles(ArticleQueryCondition queryCondition) {
        Articles articles = articleRepository.findWithSearchConditions(queryCondition);

        List<Article> articlesToReturn = articles.getArticlesToReturn();
        long totalCount = articles.getTotalCount();
        boolean hasNext = articles.hasNext();

        Cursor<?> nextCursor = articles.getNextCursor(queryCondition.sortType());
        return ArticleResponse.from(articlesToReturn, totalCount, hasNext, nextCursor);
    }

    public ProjectArticleResponse getByProjectId(long id, ProjectArticleQueryCondition condition) {
        projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));

        List<Article> articles = articleRepository.findAllByProjectIdAndCondition(id, condition);
        Map<Sector, Long> articleCountBySector = Arrays.stream(Sector.values())
                .collect(
                        Collectors.toMap(
                                sector -> sector,
                                sector -> articleRepository.countByProjectIdAndSector(id, sector)
                        )
                );

        return ProjectArticleResponse.of(articles, articleCountBySector);
    }

    @Transactional
    public void increaseClicksCount(long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTICLE_NOT_FOUND));
        article.addClickCount();
    }
}
