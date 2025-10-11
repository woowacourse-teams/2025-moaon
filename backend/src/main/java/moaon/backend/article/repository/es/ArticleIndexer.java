package moaon.backend.article.repository.es;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.repository.ArticleRepository;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleIndexer {

    private static final String NEW_INDEX_PREFIX_NAME = "articles_idx";
    private static final String ALIAS_NAME = "articles";

    private final ArticleIndexRepository indexRepository;

    public String indexAllFromSource(final ArticleRepository source) {
        log.info("Indexing articles... started at {}", LocalDateTime.now());

        IndexCoordinates newIndexWrapper = indexWrapperWithPostFixOf(NEW_INDEX_PREFIX_NAME);
        IndexCoordinates aliasWrapper = aliasWrapperOf(ALIAS_NAME);
        Set<String> existingIndexNames = indexRepository.findIndexNamesByAlias(aliasWrapper);

        var documents = toDocumentsFromRepository(source);
        createNewIndex(documents, newIndexWrapper, aliasWrapper);
        deleteOldIndices(existingIndexNames);

        log.info("Indexing articles... finished at {}", LocalDateTime.now());
        return newIndexWrapper.getIndexName();
    }

    private List<ArticleDocument> toDocumentsFromRepository(final ArticleRepository source) {
        List<Article> Articles = source.findAll();
        return Articles.stream()
                .map(ArticleDocument::new)
                .collect(Collectors.toList());
    }

    private void createNewIndex(List<ArticleDocument> documents, IndexCoordinates newIndexWrapper,
                                IndexCoordinates aliasWrapper) {
        indexRepository.createIndex(newIndexWrapper);
        indexRepository.saveAll(documents, newIndexWrapper);
        boolean succeed = indexRepository.setAlias(newIndexWrapper, aliasWrapper);
        log.info("alias set for new index : {}, {}, {}", succeed, newIndexWrapper.getIndexName(), LocalDateTime.now());
    }

    private void deleteOldIndices(Set<String> oldIndexNames) {
        oldIndexNames.forEach(name -> {
            boolean deleted = indexRepository.deleteIndex(aliasWrapperOf(name));
            log.info("deleting old index : {}, {}, {}", deleted, name, LocalDateTime.now());
        });
    }

    private IndexCoordinates indexWrapperWithPostFixOf(String indexName) {
        String newIndexName = indexName + "-" + Instant.now().toEpochMilli();
        return IndexCoordinates.of(newIndexName);
    }

    private IndexCoordinates aliasWrapperOf(String indexName) {
        return IndexCoordinates.of(indexName);
    }
}

