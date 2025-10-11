package moaon.backend.article.repository.es;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import java.util.ArrayList;
import java.util.List;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.cursor.ESCursor;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;

public class ESArticleQueryBuilder {

    private final List<Query> musts = new ArrayList<>();
    private final List<Query> filters = new ArrayList<>();
    private Pageable pageable;
    private Sort sort;
    private List<Object> searchAfter;

    public ESArticleQueryBuilder withTextSearch(SearchKeyword searchKeyword) {
        if (searchKeyword != null && searchKeyword.hasValue()) {
            musts.add(createTextMatchQuery(searchKeyword));
        }
        return this;
    }

    public ESArticleQueryBuilder withSector(Sector sector) {
        if (sector != null) {
            filters.add(createSectorQuery(sector));
        }
        return this;
    }

    public ESArticleQueryBuilder withTopicsAndMatch(List<Topic> topics) {
        if (topics != null && !topics.isEmpty()) {
            filters.add(createTopicsAndQuery(topics));
        }
        return this;
    }

    public ESArticleQueryBuilder withTopicsOrMatch(List<Topic> topics) {
        if (topics != null && !topics.isEmpty()) {
            filters.add(createTopicsOrQuery(topics));
        }
        return this;
    }

    public ESArticleQueryBuilder withTechStacksAndMatch(List<String> techStackNames) {
        if (techStackNames != null && !techStackNames.isEmpty()) {
            filters.add(createTechStacksAndQuery(techStackNames));
        }
        return this;
    }

    public ESArticleQueryBuilder withTechStacksOrMatch(List<String> techStackNames) {
        if (techStackNames != null && !techStackNames.isEmpty()) {
            filters.add(createTechStacksOrQuery(techStackNames));
        }
        return this;
    }

    public ESArticleQueryBuilder withPagination(int limit, ESCursor cursor) {
        if (cursor.isEmpty()) {
            this.pageable = PageRequest.of(0, limit);
            return this;
        }
        this.pageable = PageRequest.ofSize(limit);
        this.searchAfter = cursor.getSortValues();
        return this;
    }

    public ESArticleQueryBuilder withSort(ArticleSortType sortType) {
        this.sort = createSort(sortType);
        return this;
    }

    public NativeQuery build() {
        NativeQueryBuilder builder = NativeQuery.builder()
                .withQuery(combineBoolQuery())
                .withTrackTotalHits(true)
                .withPageable(pageable);

        if (sort != null) {
            builder.withSort(sort);
        }

        if (searchAfter != null && !searchAfter.isEmpty()) {
            builder.withSearchAfter(searchAfter);
        }

        return builder.build();
    }

    private Query createTextMatchQuery(SearchKeyword searchKeyword) {
        float titleBoost = 2f;
        float techStackBoost = 1.5f;
        float summaryBoost = 1.5f;
        float contentBoost = 1.0f;

        return MultiMatchQuery.of(m -> m
                .query(searchKeyword.value())
                .fields(
                        String.format("title^%f", titleBoost),
                        String.format("techStacks.text^%f", techStackBoost),
                        String.format("summary^%f", summaryBoost),
                        String.format("content^%f", contentBoost)
                )
        )._toQuery();
    }

    private Query createSectorQuery(Sector sector) {
        return TermQuery.of(t -> t
                .field("sector")
                .value(sector.name())
        )._toQuery();
    }

    private Query createTopicsAndQuery(List<Topic> topics) {
        List<Query> topicQueries = topics.stream()
                .map(this::createSingleTopicQuery)
                .toList();
        return BoolQuery.of(b -> b.filter(topicQueries))._toQuery();
    }

    private Query createTopicsOrQuery(List<Topic> topics) {
        List<Query> topicQueries = topics.stream()
                .map(this::createSingleTopicQuery)
                .toList();
        return BoolQuery.of(b -> b.should(topicQueries))._toQuery();
    }

    private Query createTechStacksAndQuery(List<String> techStackName) {
        List<Query> topicQueries = techStackName.stream()
                .map(this::createSingleTechStackQuery)
                .toList();
        return BoolQuery.of(b -> b.filter(topicQueries))._toQuery();
    }

    private Query createTechStacksOrQuery(List<String> techStackName) {
        List<Query> topicQueries = techStackName.stream()
                .map(this::createSingleTechStackQuery)
                .toList();
        return BoolQuery.of(b -> b.should(topicQueries))._toQuery();
    }

    private Query createSingleTopicQuery(Topic topic) {
        return TermQuery.of(t -> t
                .field("topics")
                .value(topic.name())
        )._toQuery();
    }

    private Query createSingleTechStackQuery(String techStackName) {
        return TermQuery.of(t -> t
                .field("techStacks")
                .value(techStackName)
        )._toQuery();
    }

    private Query combineBoolQuery() {
        return BoolQuery.of(b -> b
                .must(musts)
                .filter(filters)
        )._toQuery();
    }

    private Sort createSort(ArticleSortType sortType) {
        if (sortType == ArticleSortType.CLICKS) {
            return Sort.by(Order.desc("clicks"), Order.desc("id"));
        }
        return Sort.by(Order.desc("createdAt"), Order.desc("id"));
    }
}
