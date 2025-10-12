package moaon.backend.article.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.article.repository.es.ArticleIndexRepository;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleIndexer {

    private static final String NEW_INDEX_PREFIX_NAME = "articles_idx";
    private static final String ALIAS_NAME = "articles";

    private final ArticleRepository entityRepository;
    private final ArticleIndexRepository indexRepository;

    public String indexAll(int batchSize) {
        log.info("Indexing articles started");

        IndexCoordinates newIndexWrapper = indexWrapperWithPostFixOf(NEW_INDEX_PREFIX_NAME);
        IndexCoordinates aliasWrapper = indexWrapperOf(ALIAS_NAME);
        Set<String> existingIndexNames = indexRepository.findIndexNamesByAlias(aliasWrapper);

        createNewIndex(newIndexWrapper, aliasWrapper);
        indexAllInBatch(newIndexWrapper, batchSize);
        deleteOldIndices(existingIndexNames);

        log.info("Indexing articles finished");
        return newIndexWrapper.getIndexName();
    }

    private void createNewIndex(final IndexCoordinates newIndexWrapper, final IndexCoordinates aliasWrapper) {
        indexRepository.createIndex(newIndexWrapper);
        boolean succeed = indexRepository.setAlias(newIndexWrapper, aliasWrapper);
        log.info("alias set for new index : {}, {}, {}", succeed, newIndexWrapper.getIndexName(), LocalDateTime.now());
    }

    private void indexAllInBatch(IndexCoordinates dest, int batchSize) {
        List<IndexQuery> chunk = new ArrayList<>();
        try (Stream<Article> stream = entityRepository.streamAll()) {
            stream.forEach(entity -> {
                ArticleDocument doc = new ArticleDocument(entity);
                IndexQuery indexQuery = new IndexQueryBuilder().withObject(doc).build();
                chunk.add(indexQuery);

                if (chunk.size() >= batchSize) {
                    bulkIndexChunk(dest, chunk);
                }
            });
        }

        if (!chunk.isEmpty()) {
            bulkIndexChunk(dest, chunk);
        }
    }

    private void bulkIndexChunk(IndexCoordinates dest, List<IndexQuery> chunk) {
        log.info("submitted {} documents to index in {} index.", chunk.size(), dest.getIndexName());
        indexRepository.bulkIndex(chunk, dest);
        chunk.clear();
    }

    private void deleteOldIndices(Set<String> oldIndexNames) {
        oldIndexNames.forEach(name -> {
            boolean deleted = indexRepository.deleteIndex(indexWrapperOf(name));
            log.info("deleting old index : {}, {}, {}", deleted, name, LocalDateTime.now());
        });
    }

    private IndexCoordinates indexWrapperWithPostFixOf(String indexName) {
        String newIndexName = indexName + "-" + Instant.now().toEpochMilli();
        return IndexCoordinates.of(newIndexName);
    }

    private IndexCoordinates indexWrapperOf(String indexName) {
        return IndexCoordinates.of(indexName);
    }
}

