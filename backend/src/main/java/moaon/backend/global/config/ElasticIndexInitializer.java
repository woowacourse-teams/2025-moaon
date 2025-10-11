package moaon.backend.global.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleDocument;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.mapping.ElasticsearchPersistentEntity;

@Profile("!test")
@Configuration
@RequiredArgsConstructor
public class ElasticIndexInitializer {

    private static final Class<ArticleDocument> documentClass = ArticleDocument.class;

    private final ElasticsearchOperations ops;

    @PostConstruct
    public void createIndexAndMappingIfNotExist() {
        IndexOperations iops = ops.indexOps(ArticleDocument.class);

        if (shouldCreateIndexAndMapping() && !iops.exists()) {
            iops.createWithMapping();
        } else if (shouldAlwaysWriteMapping()) {
            iops.putMapping();
        }
    }

    private boolean shouldCreateIndexAndMapping() {
        ElasticsearchPersistentEntity<?> entity = ops
                .getElasticsearchConverter()
                .getMappingContext()
                .getRequiredPersistentEntity(documentClass);

        return entity.isCreateIndexAndMapping();
    }

    private boolean shouldAlwaysWriteMapping() {
        return ops.getElasticsearchConverter()
                .getMappingContext()
                .getRequiredPersistentEntity(documentClass)
                .isAlwaysWriteMapping();
    }
}

