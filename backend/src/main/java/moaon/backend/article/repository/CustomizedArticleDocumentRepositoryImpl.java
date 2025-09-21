package moaon.backend.article.repository;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CustomizedArticleDocumentRepositoryImpl implements CustomizedArticleDocumentRepository {

    private final ElasticsearchOperations ops;

    @Override
    public List<ArticleDocument> search(final ArticleQueryCondition condition) {
        final var musts = new ArrayList<Query>();
        final var search = condition.search();
        if (search != null && search.hasValue()) {
            musts.add(textMatches(search));
        }

        final var filters = new ArrayList<Query>();
        final var sector = condition.sector();
        if (sector != null) {
            filters.add(sectorEquals(sector));
        }

        final var topics = condition.topics();
        if (topics != null && !topics.isEmpty()) {
            filters.add(allTopicsMatch(topics));
        }

        final var techStackNames = condition.techStackNames();
        if (techStackNames != null && !techStackNames.isEmpty()) {
            filters.add(allTechStacksMatch(techStackNames));
        }

        final var nativeQuery = combineQueries(musts, filters);
        final var searchHits = ops.search(nativeQuery, ArticleDocument.class);
        return searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();
    }

    private Query sectorEquals(final Sector sector) {
        return TermQuery.of(t -> t
                .field("sector")
                .value(sector.name())
        )._toQuery();
    }

    private Query allTopicsMatch(List<Topic> topics) {
        final var filter = topics.stream()
                .map(this::topicEquals)
                .toList();
        return BoolQuery.of(b -> b
                .filter(filter)
        )._toQuery();
    }

    private Query topicEquals(final Topic topic) {
        return TermQuery.of(t -> t
                .field("topics")
                .value(topic.name())
        )._toQuery();
    }

    private Query allTechStacksMatch(List<String> techStackNames) {
        final var filter = techStackNames.stream()
                .map(this::techStackEquals)
                .toList();
        return BoolQuery.of(b -> b
                .filter(filter)
        )._toQuery();
    }

    private Query techStackEquals(final String techStackName) {
        return TermQuery.of(t -> t
                .field("techStacks.name")
                .value(techStackName)
        )._toQuery();
    }

    private Query textMatches(final SearchKeyword searchKeyword) {
        return MultiMatchQuery.of(m -> m
                .query(searchKeyword.value())
                .fields("title^3", "techStacks.name.text^2.5", "summary^2", "content^1")
        )._toQuery();
    }

    private NativeQuery combineQueries(final List<Query> musts, final List<Query> filters) {
        final var boolQuery = BoolQuery.of(b -> b
                .must(musts)
                .filter(filters)
        )._toQuery();

        return NativeQuery.builder()
                .withQuery(boolQuery)
                .build();
    }
}
