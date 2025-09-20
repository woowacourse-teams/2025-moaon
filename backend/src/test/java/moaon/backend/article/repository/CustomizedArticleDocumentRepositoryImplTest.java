package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;

import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.global.domain.SearchKeyword;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

@SpringBootTest
@Rollback(true)
//@MockitoBean(types = JpaMetamodelMappingContext.class)
class CustomizedArticleDocumentRepositoryImplTest {

    @Autowired
    private ArticleDocumentRepository repository;

    @Test
    void search() {
        repository.save(new ArticleDocument("1", "제목", "한 줄 요약", "내용"));

        final var articles = repository.search(new SearchKeyword("요약"));

        assertThat(articles).containsExactly(new ArticleDocument("1", "제목", "한 줄 요약", "내용"));
    }
}

