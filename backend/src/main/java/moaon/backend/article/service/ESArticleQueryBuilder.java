package moaon.backend.article.service;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;

import java.util.ArrayList;
import java.util.List;

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

    public ESArticleQueryBuilder withPagination(int page, int size) {
        this.pageable = PageRequest.of(page, size);
        return this;
    }

    public ESArticleQueryBuilder withPagination(int size, List<Object> searchAfter) {
        this.pageable = PageRequest.ofSize(size);
        this.searchAfter = searchAfter;
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
        return MultiMatchQuery.of(m -> m
                .query(searchKeyword.value())
                .fields("title^3", "techStacks.text^2.5", "summary^2", "content^1")
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
