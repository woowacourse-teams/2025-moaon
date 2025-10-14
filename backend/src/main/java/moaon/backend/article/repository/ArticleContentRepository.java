package moaon.backend.article.repository;

import java.net.URL;
import java.util.Optional;
import moaon.backend.article.domain.ArticleContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleContentRepository extends JpaRepository<ArticleContent, Long> {

    Optional<ArticleContent> findByUrl(URL url);
}
