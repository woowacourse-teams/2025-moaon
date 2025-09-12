package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

public interface CustomizedArticleRepository {

    List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition);

    long countWithSearchCondition(ArticleQueryCondition queryCondition);

    List<Article> findAllByProjectIdAndSector(long id, ProjectArticleQueryCondition condition);
}
