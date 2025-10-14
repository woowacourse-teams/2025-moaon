package moaon.backend.article.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ContentFinder;
import moaon.backend.article.domain.ContentFinders;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleResponse;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.repository.TechStackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private static final ContentFinders FINDER = new ContentFinders();

    private final ArticleRepository articleRepository;
    private final ProjectRepository projectRepository;
    private final TechStackRepository techStackRepository;

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

    @Transactional
    public void save(List<ArticleCreateRequest> requests) {
        for (ArticleCreateRequest request : requests) {
            ContentFinder finder = FINDER.getFinder(request.url());
            ArticleCrawlResult result = finder.crawl(request.url());
            Project project = projectRepository.findById(request.projectId()).orElseThrow(
                    () -> new CustomException(ErrorCode.PROJECT_NOT_FOUND)
            );

            Article article = new Article(
                    request.title(),
                    request.summary(),
                    result.content(),
                    request.url().toString(),
                    LocalDateTime.now(),
                    project,
                    Sector.of(request.sector()),
                    request.topics()
                            .stream().
                            map(Topic::of).
                            toList(),
                    request.techStacks()
                            .stream()
                            .map(techStackRepository::findByName)
                            .toList()
            );

            articleRepository.save(article);
        }
    }
}
