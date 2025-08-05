package moaon.backend.fixture;

import java.util.List;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.Cursor;

public class ArticleQueryConditionBuilder {

    private String search;
    private String categoryName;
    private List<String> techStackNames;
    private ArticleSortBy sortBy;
    private int limit;
    private Cursor<?> cursor;

    public ArticleQueryConditionBuilder() {
        this.search = null;
        this.categoryName = null;
        this.techStackNames = null;
        this.sortBy = null;
        this.limit = 0;
        this.cursor = null;
    }

    public ArticleQueryConditionBuilder search(String search) {
        this.search = search;
        return this;
    }

    public ArticleQueryConditionBuilder categoryName(String categoryName) {
        this.categoryName = categoryName;
        return this;
    }

    public ArticleQueryConditionBuilder techStackNames(List<String> techStackNames) {
        this.techStackNames = techStackNames;
        return this;
    }

    public ArticleQueryConditionBuilder sortBy(ArticleSortBy articleSortBy) {
        this.sortBy = articleSortBy;
        return this;
    }

    public ArticleQueryConditionBuilder limit(int limit) {
        this.limit = limit;
        return this;
    }

    public ArticleQueryConditionBuilder cursor(Cursor<?> cursor) {
        this.cursor = cursor;
        return this;
    }

    public ArticleQueryCondition build() {
        return new ArticleQueryCondition(
                search,
                categoryName,
                techStackNames,
                sortBy,
                limit,
                cursor
        );
    }
}
