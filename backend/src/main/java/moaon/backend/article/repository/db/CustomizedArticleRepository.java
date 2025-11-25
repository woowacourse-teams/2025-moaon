package moaon.backend.article.repository.db;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

public interface CustomizedArticleRepository {

    ArticleSearchResult findWithSearchConditions(ArticleQueryCondition queryCondition);

    List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition);
}
