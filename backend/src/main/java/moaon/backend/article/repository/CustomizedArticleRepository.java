package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleQueryCondition;

public interface CustomizedArticleRepository {

    List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition);

    long countWithSearchCondition(ArticleQueryCondition queryCondition);

    List<Article> findAllByProjectIdAndCategory(long id, Sector sector);
}
