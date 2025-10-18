package moaon.backend.article.repository.es;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.document.Document;
import org.springframework.data.elasticsearch.core.index.AliasAction;
import org.springframework.data.elasticsearch.core.index.AliasAction.Add;
import org.springframework.data.elasticsearch.core.index.AliasAction.Remove;
import org.springframework.data.elasticsearch.core.index.AliasAction.RemoveIndex;
import org.springframework.data.elasticsearch.core.index.AliasActionParameters;
import org.springframework.data.elasticsearch.core.index.AliasActions;
import org.springframework.data.elasticsearch.core.index.Settings;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleIndexRepository {

    private final ElasticsearchOperations ops;

    public boolean createIndex(IndexCoordinates indexWrapper, Class<?> documentClass) {
        IndexOperations iops = ops.indexOps(indexWrapper);
        if (iops.exists()) {
            throw new IllegalStateException("index already exists : " + indexWrapper.getIndexName());
        }

        Document mapping = iops.createMapping(documentClass);
        Settings settings = iops.createSettings(documentClass);

        return iops.create(settings, mapping);
    }

    public void bulkIndex(List<IndexQuery> documentQueries, IndexCoordinates indexWrapper) {
        ops.bulkIndex(documentQueries, indexWrapper);
    }

    public void switchAlias(
            IndexCoordinates newIndexWrapper,
            Set<String> oldIndexNames,
            IndexCoordinates aliasWrapper
    ) {
        IndexOperations iops = ops.indexOps(newIndexWrapper);
        AliasActions aliasActions = new AliasActions();

        aliasActions.add(addNewIndex(aliasWrapper, iops));
        aliasActions.add(removeOldIndices(oldIndexNames, aliasWrapper));

        iops.alias(aliasActions);
    }

    private AliasAction addNewIndex(IndexCoordinates aliasWrapper, IndexOperations iops) {
        return new Add(AliasActionParameters.builder()
                .withIndices(iops.getIndexCoordinates().getIndexNames())
                .withAliases(aliasWrapper.getIndexName())
                .withIsWriteIndex(true)
                .build());
    }

    private Remove removeOldIndices(Set<String> oldIndexNames, IndexCoordinates aliasWrapper) {
        return new Remove(AliasActionParameters.builder()
                .withIndices(oldIndexNames.toArray(String[]::new))
                .withAliases(aliasWrapper.getIndexName())
                .build());
    }

    public void removeAlias(IndexCoordinates indexWrapper, IndexCoordinates aliasWrapper) {
        IndexOperations iops = ops.indexOps(indexWrapper);
        AliasActions aliasActions = new AliasActions();
        AliasAction action = new RemoveIndex(AliasActionParameters.builder()
                .withIndices(iops.getIndexCoordinates().getIndexNames())
                .withAliases(aliasWrapper.getIndexName())
                .build());
        aliasActions.add(action);

        iops.alias(aliasActions);
    }

    public Set<String> findIndexNamesByAlias(IndexCoordinates aliasWrapper) {
        IndexOperations iops = ops.indexOps(aliasWrapper);
        if (!iops.exists()) {
            return Collections.emptySet();
        }

        return iops.getAliasesForIndex(aliasWrapper.getIndexName()).keySet();
    }

    public void deleteIndex(IndexCoordinates indexWrapper) {
        IndexOperations iops = ops.indexOps(indexWrapper);
        iops.delete();
    }
}
