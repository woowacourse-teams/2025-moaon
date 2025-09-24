package moaon.backend.es;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.RefreshPolicy;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleDocumentRepositoryImpl implements ArticleDocumentRepository {

    private final ElasticsearchOperations ops;

    @Override
    public SearchHits<ArticleDocument> search(ArticleESQuery condition) {
        List<Query> musts = new ArrayList<>();
        SearchKeyword search = condition.search();
        if (search != null && search.hasValue()) {
            musts.add(textMatches(search));
        }

        List<Query> filters = new ArrayList<>();
        Sector sector = condition.sector();
        if (sector != null) {
            filters.add(sectorEquals(sector));
        }

        List<Topic> topics = condition.topics();
        if (topics != null && !topics.isEmpty()) {
            filters.add(allTopicsMatch(topics));
        }

        List<String> techStackNames = condition.techStackNames();
        if (techStackNames != null && !techStackNames.isEmpty()) {
            filters.add(allTechStacksMatch(techStackNames));
        }

        NativeQuery nativeQuery = nativeQueryWithPagings(condition)
                .withQuery(combineQueries(musts, filters))
                .withTrackTotalHits(true)
                .withSort(toSort(condition.sortBy()))
                .build();
        return ops.search(nativeQuery, ArticleDocument.class);
    }

    private NativeQueryBuilder nativeQueryWithPagings(ArticleESQuery condition) {
        ESCursor cursor = condition.cursor();
        if (cursor.isEmpty()) {
            return NativeQuery.builder().withPageable(PageRequest.of(0, condition.limit()));
        }

        return NativeQuery.builder()
                .withPageable(PageRequest.ofSize(condition.limit()))
                .withSearchAfter(cursor.getSortValues());
    }

    private Query sectorEquals(Sector sector) {
        return TermQuery.of(t -> t
                .field("sector")
                .value(sector.name())
        )._toQuery();
    }

    private Query allTopicsMatch(List<Topic> topics) {
        List<Query> filter = topics.stream()
                .map(this::topicEquals)
                .toList();
        return BoolQuery.of(b -> b
                .filter(filter)
        )._toQuery();
    }

    private Query topicEquals(Topic topic) {
        return TermQuery.of(t -> t
                .field("topics")
                .value(topic.name())
        )._toQuery();
    }

    private Query allTechStacksMatch(List<String> techStackNames) {
        List<Query> filter = techStackNames.stream()
                .map(this::techStackEquals)
                .toList();
        return BoolQuery.of(b -> b
                .filter(filter)
        )._toQuery();
    }

    private Query techStackEquals(String techStackName) {
        return TermQuery.of(t -> t
                .field("techStacks.name")
                .value(techStackName)
        )._toQuery();
    }

    private Query textMatches(SearchKeyword searchKeyword) {
        return MultiMatchQuery.of(m -> m
                .query(searchKeyword.value())
                .fields("title^3", "techStacks.name.text^2.5", "summary^2", "content^1")
        )._toQuery();
    }

    private Query combineQueries(List<Query> musts, List<Query> filters) {
        return BoolQuery.of(b -> b
                .must(musts)
                .filter(filters)
        )._toQuery();
    }

    private Sort toSort(ArticleSortType sortBy) {
        if (sortBy == ArticleSortType.CLICKS) {
            return Sort.by(Order.desc("clicks"), Order.desc("id"));
        }
        return Sort.by(Order.desc("createdAt"), Order.desc("id"));
//        return Sort.by(Order.desc("_score"), Order.desc("id"));
    }

    @Override
    public ArticleDocument save(final ArticleDocument articleDocument) {
        return ops.withRefreshPolicy(RefreshPolicy.IMMEDIATE).save(articleDocument);
    }
}
