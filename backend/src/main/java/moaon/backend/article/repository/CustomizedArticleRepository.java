package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

public interface CustomizedArticleRepository {

    List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition);

    List<Article> findWithSearchConditions2(ArticleQueryCondition queryCondition);

    long countWithSearchCondition(ArticleQueryCondition queryCondition);

    List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition);
}
