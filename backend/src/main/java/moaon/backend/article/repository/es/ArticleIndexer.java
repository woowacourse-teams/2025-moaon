package moaon.backend.article.repository.es;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.db.ArticleDBRepository;
import org.springframework.data.elasticsearch.annotations.Alias;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleIndexer {

    private static final Document DOCUMENT_ANNOTATION = ArticleDocument.class.getAnnotation(Document.class);

    private final ArticleDBRepository entityRepository;
    private final ArticleIndexRepository indexRepository;

    public void indexAll(int batchSize) {
        log.info("Indexing articles started");
        String newIndexName = DOCUMENT_ANNOTATION.indexName() + "-" + Instant.now().toEpochMilli();
        IndexCoordinates newIndexWrapper = IndexCoordinates.of(newIndexName);
        IndexCoordinates aliasWrapper = aliasWrapper();

        rebuild(newIndexWrapper, aliasWrapper, batchSize);

        log.info("Indexing articles finished");
    }

    private void rebuild(IndexCoordinates newIndexWrapper, IndexCoordinates aliasWrapper, int batchSize) {
        Set<String> oldIndexNames = indexRepository.findIndexNamesByAlias(aliasWrapper);

        createNewIndex(newIndexWrapper);

        indexAllInBatch(newIndexWrapper, batchSize);
        indexRepository.switchAlias(newIndexWrapper, oldIndexNames, aliasWrapper);

        deleteOldIndices(oldIndexNames, aliasWrapper);
    }

    private void createNewIndex(IndexCoordinates newIndexWrapper) {
        boolean succeed = indexRepository.createIndex(newIndexWrapper, ArticleDocument.class);
        log.info("index created : {}, {}", succeed, newIndexWrapper.getIndexName());
    }

    private void indexAllInBatch(IndexCoordinates targetIndex, int batchSize) {
        List<IndexQuery> chunk = new ArrayList<>();
        try (Stream<Article> stream = entityRepository.streamAll()) {
            stream.forEach(entity -> {
                ArticleDocument doc = new ArticleDocument(entity);
                IndexQuery indexQuery = new IndexQueryBuilder().withObject(doc).build();
                chunk.add(indexQuery);

                if (chunk.size() >= batchSize) {
                    indexChunkInBulk(targetIndex, chunk);
                }
            });
        }

        if (!chunk.isEmpty()) {
            indexChunkInBulk(targetIndex, chunk);
        }
    }

    private void indexChunkInBulk(IndexCoordinates targetIndex, List<IndexQuery> chunk) {
        log.info("indexed {} documents to index in {} index.", chunk.size(), targetIndex.getIndexName());
        indexRepository.bulkIndex(chunk, targetIndex);
        chunk.clear();
    }

    private void deleteOldIndices(Set<String> oldIndexNames, IndexCoordinates aliasWrapper) {
        if (oldIndexNames == null || oldIndexNames.isEmpty()) {
            log.info("no old indices to delete for alias {}", Arrays.toString(aliasWrapper.getIndexNames()));
            return;
        }
        IndexCoordinates oldIndicesWrapper = IndexCoordinates.of(oldIndexNames.toArray(String[]::new));
        indexRepository.removeAlias(oldIndicesWrapper, aliasWrapper);
        indexRepository.deleteIndex(oldIndicesWrapper);
        log.info("deleting old index : {}", oldIndexNames);
    }

    private IndexCoordinates aliasWrapper() {
        String[] aliasNames = Arrays.stream(DOCUMENT_ANNOTATION.aliases())
                .map(Alias::value)
                .toArray(String[]::new);
        return IndexCoordinates.of(aliasNames);
    }
}

