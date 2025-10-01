package moaon.backend.fixture;

import java.util.Arrays;
import java.util.List;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;

public class ArticleQueryConditionBuilder {

    private SearchKeyword search;
    private Sector sector;
    private List<Topic> topics;
    private List<String> techStackNames;
    private ArticleSortType sortBy;
    private int limit;
    private Cursor<?> articleCursor;

    public ArticleQueryConditionBuilder(int limit, ArticleSortType sortType) {
        this.search = new SearchKeyword(null);
        this.sector = null;
        this.topics = null;
        this.techStackNames = null;
        this.sortBy = sortType;
        this.limit = limit;
        this.articleCursor = null;
    }

    public ArticleQueryConditionBuilder search(String search) {
        this.search = new SearchKeyword(search);
        return this;
    }

    public ArticleQueryConditionBuilder sector(Sector sector) {
        this.sector = sector;
        return this;
    }

    public ArticleQueryConditionBuilder topics(Topic... topics) {
        this.topics = Arrays.asList(topics);
        return this;
    }

    public ArticleQueryConditionBuilder techStackNames(List<String> techStackNames) {
        this.techStackNames = techStackNames;
        return this;
    }

    public ArticleQueryConditionBuilder techStackNames(String... techStackNames) {
        this.techStackNames = Arrays.asList(techStackNames);
        return this;
    }

    public ArticleQueryConditionBuilder sortBy(ArticleSortType articleSortType) {
        this.sortBy = articleSortType;
        return this;
    }

    public ArticleQueryConditionBuilder limit(int limit) {
        this.limit = limit;
        return this;
    }

    public ArticleQueryConditionBuilder cursor(Cursor<?> articleCursor) {
        this.articleCursor = articleCursor;
        return this;
    }

    public ArticleQueryCondition build() {
        return new ArticleQueryCondition(
                search,
                sector,
                topics,
                techStackNames,
                sortBy,
                limit,
                articleCursor
        );
    }
}
