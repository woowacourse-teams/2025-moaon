package moaon.backend.es;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CustomizedArticleDocumentRepositoryImpl implements CustomizedArticleDocumentRepository {

    private final ElasticsearchOperations ops;

    @Override
    public SearchHits<ArticleDocument> search(final ArticleQueryCondition condition) {
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

        final var nativeQuery = nativeQueryWithPagings(condition)
                .withQuery(combineQueries(musts, filters))
                .withTrackTotalHits(true)
                .withSort(toSort(condition.sortBy()))
                .build();
        return ops.search(nativeQuery, ArticleDocument.class);
    }

    private NativeQueryBuilder nativeQueryWithPagings(final ArticleQueryCondition condition) {
        final var cursor = condition.articleCursor();
        if (cursor == null) {
            return NativeQuery.builder().withPageable(PageRequest.of(0, condition.limit()));
        }

        return NativeQuery.builder()
                .withPageable(PageRequest.ofSize(condition.limit()))
                .withSearchAfter(cursorSortValues(condition));
    }

    // todo 커서 ㅅㅂ
    private List<Object> cursorSortValues(final ArticleQueryCondition condition) {
        final var cursor = condition.articleCursor();
        final var sortValue = cursor.getSortValue();
        final var lastId = cursor.getLastId();

        //return List.of(Double.parseDouble(sortValue.toString()), lastId);
        /*
        createdate, clicks, score
        long epochmillis
         */
        if (ArticleSortType.CREATED_AT == condition.sortBy()) {
            return List.of(Long.parseLong(sortValue.toString()), lastId);
        }
        return List.of(sortValue, lastId);
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

    private Query combineQueries(final List<Query> musts, final List<Query> filters) {
        return BoolQuery.of(b -> b
                .must(musts)
                .filter(filters)
        )._toQuery();
    }

    private Sort toSort(final ArticleSortType sortBy) {
//        if (sortBy == ArticleSortType.CLICKS) {
//            return Sort.by(Order.desc("clicks"), Order.desc("id"));
//        }
//        return Sort.by(Order.desc("createdAt"), Order.desc("id"));
        return Sort.by(Order.desc("_score"), Order.desc("id"));
    }
}
