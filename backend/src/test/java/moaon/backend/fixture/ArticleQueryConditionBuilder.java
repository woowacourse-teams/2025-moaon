package moaon.backend.fixture;

import java.util.List;
import moaon.backend.article.domain.ArticleSortBy;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.cursor.ArticleCursor;

public class ArticleQueryConditionBuilder {

    private String search;
    private String categoryName;
    private List<String> techStackNames;
    private ArticleSortBy sortBy;
    private int limit;
    private ArticleCursor<?> articleCursor;

    public ArticleQueryConditionBuilder() {
        this.search = null;
        this.categoryName = "all";
        this.techStackNames = null;
        this.sortBy = null;
        this.limit = 50;
        this.articleCursor = null;
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

    public ArticleQueryConditionBuilder cursor(ArticleCursor<?> articleCursor) {
        this.articleCursor = articleCursor;
        return this;
    }

    public ArticleQueryCondition build() {
        return new ArticleQueryCondition(
                search,
                categoryName,
                techStackNames,
                sortBy,
                limit,
                articleCursor
        );
    }
}
