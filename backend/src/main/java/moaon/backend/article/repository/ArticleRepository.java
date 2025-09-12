package moaon.backend.article.repository;

import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long>, CustomizedArticleRepository {

    Integer countByProjectIdAndSector(Long id, Sector sector);
}
