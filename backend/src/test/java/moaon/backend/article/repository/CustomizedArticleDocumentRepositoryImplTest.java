package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Set;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.techStack.domain.TechStackField;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
@Rollback(true)
@MockitoBean(types = JpaMetamodelMappingContext.class)
class CustomizedArticleDocumentRepositoryImplTest {

    @Autowired
    private ArticleDocumentRepository repository;

    @Test
    void search() {
        final var saved = repository.save(new ArticleDocument(
                "1",
                "제목",
                "한 줄 요약",
                "내용",
                Sector.BE,
                Set.of(Topic.DATABASE, Topic.CODE_QUALITY, Topic.TECHNOLOGY_ADOPTION),
                Set.of(new TechStackField("1", "MySQL")))
        );

        final var articles = repository.search(new SearchKeyword("요약"));

        assertThat(articles).containsExactly(saved);
    }
}

