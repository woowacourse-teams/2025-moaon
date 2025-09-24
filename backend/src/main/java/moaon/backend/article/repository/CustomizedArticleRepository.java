package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

public interface CustomizedArticleRepository {

    List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition);

    long countWithSearchCondition(ArticleQueryCondition queryCondition);

    List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition);

    List<Article> findWithTechStackFilter(ArticleQueryCondition queryCondition);

    List<Article> findWithTopicFilter(ArticleQueryCondition queryCondition);

    List<Article> findWithBasicFilter(ArticleQueryCondition queryCondition);

    long countWithTechStackFilter(ArticleQueryCondition queryCondition);

    long countWithTopicFilter(ArticleQueryCondition queryCondition);

    long countWithBasicFilter(ArticleQueryCondition queryCondition);
}
