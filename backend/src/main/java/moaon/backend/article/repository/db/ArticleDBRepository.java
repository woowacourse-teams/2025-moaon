package moaon.backend.article.repository.db;

import java.util.stream.Stream;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ArticleDBRepository extends JpaRepository<Article, Long>, CustomizedArticleRepository {

    Long countByProjectIdAndSector(long id, Sector sector);

    @Query("select a from Article a")
    Stream<Article> streamAll();
}
