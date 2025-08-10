package moaon.backend.fixture;

import java.util.List;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.global.domain.cursor.Cursor;

public class ArticleQueryConditionBuilder {

    private SearchKeyword search;
    private String categoryName;
    private List<String> techStackNames;
    private ArticleSortType sortBy;
    private int limit;
    private Cursor<?> articleCursor;

    public ArticleQueryConditionBuilder() {
        this.search = new SearchKeyword(null);
        this.categoryName = "all";
        this.techStackNames = null;
        this.sortBy = null;
        this.limit = 50;
        this.articleCursor = null;
    }

    public ArticleQueryConditionBuilder search(String search) {
        this.search = new SearchKeyword(search);
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
                categoryName,
                techStackNames,
                sortBy,
                limit,
                articleCursor
        );
    }
}
