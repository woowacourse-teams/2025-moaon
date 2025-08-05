package moaon.backend.article.repository;

import java.util.List;
import moaon.backend.article.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long>, CustomizedArticleRepository {
    
    List<Article> findAllByProjectId(long id);
}
