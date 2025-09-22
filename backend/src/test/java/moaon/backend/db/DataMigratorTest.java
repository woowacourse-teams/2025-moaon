package moaon.backend.db;

import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.ArticleDocumentRepository;
import moaon.backend.article.repository.ArticleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Rollback(false)
@ActiveProfiles("local")
//@Disabled
public class DataMigratorTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleDocumentRepository articleDocumentRepository;

    @Test
    @Transactional(readOnly = true)
    void migrate() {
        final var articles = articleRepository.findAll();
        for (final var article : articles) {
            final var doc = new ArticleDocument(article);
            articleDocumentRepository.save(doc);
        }
    }
}
