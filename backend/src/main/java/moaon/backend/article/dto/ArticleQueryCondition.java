package moaon.backend.article.dto;

import java.util.List;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.domain.SearchKeyword;

public record ArticleQueryCondition(
        SearchKeyword search,
        Sector sector,
        List<Topic> topics,
        List<String> techStackNames,
        ArticleSortType sortType,
        int limit,
        ArticleCursor cursor
) {

    public ArticleQueryCondition {
        boolean cannotKeepRelevance = ArticleSortType.RELEVANCE == sortType && !search.hasValue();
        if (cannotKeepRelevance) {
            sortType = ArticleSortType.CREATED_AT;
        }
    }
}
