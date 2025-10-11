package moaon.backend.article.repository.es;

import java.util.Collections;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleDocument;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.index.AliasAction;
import org.springframework.data.elasticsearch.core.index.AliasAction.Add;
import org.springframework.data.elasticsearch.core.index.AliasActionParameters;
import org.springframework.data.elasticsearch.core.index.AliasActions;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleIndexRepository {

    private final ElasticsearchOperations ops;

    public boolean createIndex(final IndexCoordinates indexWrapper) {
        IndexOperations iops = ops.indexOps(indexWrapper);
        if (iops.exists()) {
            throw new IllegalStateException("index already exists : " + indexWrapper.getIndexName());
        }

        iops.createMapping(ArticleDocument.class);
        iops.createSettings(ArticleDocument.class);
        return iops.create();
    }

    public Iterable<ArticleDocument> saveAll(final Iterable<ArticleDocument> documents,
                                             final IndexCoordinates indexName) {
        return ops.save(documents, indexName);
    }

    public boolean setAlias(final IndexCoordinates indexWrapper, final IndexCoordinates aliasWrapper) {
        IndexOperations iops = ops.indexOps(indexWrapper);
        AliasActions aliasActions = new AliasActions();
        AliasAction action = new Add(AliasActionParameters.builder()
                .withIndices(iops.getIndexCoordinates().getIndexNames())
                .withAliases(aliasWrapper.getIndexName())
                .build());
        aliasActions.add(action);

        return iops.alias(aliasActions);
    }

    public Set<String> findIndexNamesByAlias(final IndexCoordinates aliasNameWrapper) {
        IndexOperations iops = ops.indexOps(aliasNameWrapper);
        if (!iops.exists()) {
            return Collections.emptySet();
        }

        return iops.getAliasesForIndex(aliasNameWrapper.getIndexName()).keySet();
    }

    public boolean deleteIndex(final IndexCoordinates indexNameWrapper) {
        IndexOperations iops = ops.indexOps(indexNameWrapper);
        return iops.delete();
    }
}
