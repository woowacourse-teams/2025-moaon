package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Articles;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

public interface CustomizedArticleRepository {

    Articles findWithSearchConditions(ArticleQueryCondition queryCondition);

    List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition);
}
