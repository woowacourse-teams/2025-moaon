package moaon.backend.article.repository.es;

import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery.Builder;
import co.elastic.clients.elasticsearch._types.query_dsl.DisMaxQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQuery;
import jakarta.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
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
    private boolean trackScores = false;
    private List<Object> searchAfter;

    public ESArticleQueryBuilder withIds(List<Long> ids) {
        if (ids != null && !ids.isEmpty()) {
            filters.add(createIdsQuery(ids));
        }
        return this;
    }

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

    public ESArticleQueryBuilder withPagination(int limit, @Nullable ArticleCursor cursor, ArticleSortType sortType) {
        if (cursor == null) {
            limit = Math.max(limit, 1);
            this.pageable = PageRequest.of(0, limit);
            return this;
        }
        this.pageable = PageRequest.ofSize(limit);
        if (ArticleSortType.CREATED_AT == sortType) {
            this.searchAfter = List.of(cursor.getSortValueAs(obj -> Long.parseLong(obj.toString())),
                    cursor.getLastId());
            return this;
        }

        this.searchAfter = List.of(cursor.getSortValue(), cursor.getLastId());
        return this;
    }

    public ESArticleQueryBuilder withSort(ArticleSortType sortType) {
        this.sort = createSort(sortType);
        return this;
    }

    public ESArticleQueryBuilder withQueryCondition(ArticleQueryCondition condition) {
        return this.withTextSearch(condition.search())
                .withSector(condition.sector())
                .withTechStacksAndMatch(condition.techStackNames())
                .withTopicsAndMatch(condition.topics())
                .withSort(condition.sortType())
                .withPagination(condition.limit(), condition.cursor(), condition.sortType());
    }

    public NativeQuery build() {
        NativeQueryBuilder builder = NativeQuery.builder()
                .withQuery(combineBoolQuery())
                .withTrackTotalHits(true)
                .withTrackScores(trackScores)
                .withPageable(pageable);

        if (sort != null) {
            builder.withSort(sort);
        }

        if (searchAfter != null && !searchAfter.isEmpty()) {
            builder.withSearchAfter(searchAfter);
        }

        return builder.build();
    }

    private Query createIdsQuery(List<Long> ids) {
        List<FieldValue> values = ids.stream().map(FieldValue::of).toList();
        return TermsQuery.of(t -> t
                .field("id")
                .terms(f -> f.value(values))
        )._toQuery();
    }

    private Query createTextMatchQuery(SearchKeyword searchKeyword) {
        if (!searchKeyword.hasValue()) {
            throw new IllegalArgumentException("검색어가 비어있습니다.");
        }

        /*
        1. 토큰의 갯수와 상관없이 마지막 토큰은 OR( Match + Edge-ngram(1~30) ) 매칭
        - 마지막 토큰은 입력중인 지, 입력 완료인 지 판단할 수 없습니다. 사용자 의도에 따라 다르기도 합니다.

        2. 토큰의 갯수가 2개 이상이면, 마지막 토큰 이전의 모든 검색어는 "필수" 매칭
         */

        String lastToken = searchKeyword.lastToken();
        BoolQuery.Builder lastTokenBoolQueryBuilder = QueryBuilders.bool()
                .should(Query.of(q -> q.multiMatch(multiMatch(lastToken, 1.5f, 1.25f, 1.0f))),
                        Query.of(q -> q.disMax(dismaxEdgeNgram(lastToken))))
                .minimumShouldMatch("1");

        return createQueryConsideringNumOfTokens(searchKeyword, lastTokenBoolQueryBuilder);
    }

    private Query createQueryConsideringNumOfTokens(SearchKeyword searchKeyword, Builder lastTokenBoolQueryBuilder) {
        // --- 검색어가 한 단어인 경우 마지막 토큰에 대해 OR(match, Edge-ngram) ---
        if (searchKeyword.hasOnlyOneToken()) {
            return lastTokenBoolQueryBuilder.build()._toQuery();
        }

        // 검색어가 두 단어 이상으로 이루어진 경우 마지막 이전 단어들은 필수 매칭
        List<Query> multiMatches = searchKeyword.allTokensBeforeLastToken().stream()
                .map(token -> Query.of(q -> q.multiMatch(multiMatch(token, 2.0f, 1.5f, 1.0f))))
                .toList();
        return lastTokenBoolQueryBuilder.must(multiMatches).build()._toQuery();
    }

    private MultiMatchQuery multiMatch(String token, float titleBoost, float summaryBoost, float contentBoost) {
        String title = String.format("title^%.2f", titleBoost);
        String summary = String.format("summary^%.2f", summaryBoost);
        String content = String.format("content^%.2f", contentBoost);
        return MultiMatchQuery.of(m -> m.query(token).fields(title, summary, content));
    }

    private DisMaxQuery dismaxEdgeNgram(String token) {
        return DisMaxQuery.of(d -> d
                .tieBreaker(0.4)
                .queries(
                        Query.of(b -> b.match(m -> m.field("title.auto").query(token).boost(1.5f))),
                        Query.of(b -> b.match(m -> m.field("summary.auto").query(token).boost(1.25f)))
                )
        );
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
        return switch (sortType) {
            case RELEVANCE -> {
                this.trackScores = true;
                yield Sort.by(Order.desc("_score"), Order.asc("id"));
            }
            case CLICKS -> Sort.by(Order.desc("clicks"), Order.asc("id"));
            case CREATED_AT -> Sort.by(Order.desc("createdAt"), Order.asc("id"));
        };
    }
}
