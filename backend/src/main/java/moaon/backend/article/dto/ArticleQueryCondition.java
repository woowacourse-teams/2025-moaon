package moaon.backend.article.dto;

import java.util.List;
import java.util.Objects;
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

    public static ArticleQueryCondition from(
            String search,
            String sector,
            List<String> topics,
            List<String> techStackNames,
            String sortType,
            int limit,
            String cursor
    ) {
        SearchKeyword searchKeyword = new SearchKeyword(search);
        ArticleSortType sortBy = createArticleSortType(sortType, searchKeyword);
        return new ArticleQueryCondition(
                searchKeyword,
                Sector.of(sector),
                topics == null
                        ? List.of()
                        : topics.stream()
                                .map(Topic::of)
                                .filter(Objects::nonNull)
                                .toList(),
                techStackNames == null
                        ? List.of()
                        : techStackNames,
                sortBy,
                limit,
                cursor == null ? null : new ArticleCursor(cursor)
        );
    }

    private static ArticleSortType createArticleSortType(String sortType, SearchKeyword searchKeyword) {
        ArticleSortType sort = ArticleSortType.from(sortType);
        // 관련도순 정렬이나 검색어가 없으면 CREATED_AT으로 방어
        if (ArticleSortType.RELEVANCE == sort && !searchKeyword.hasValue()) {
            return ArticleSortType.CREATED_AT;
        }

        return sort;
    }
}
