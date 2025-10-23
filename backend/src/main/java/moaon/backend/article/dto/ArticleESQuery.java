package moaon.backend.article.dto;

import java.util.List;
import java.util.Objects;
import lombok.Builder;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.cursor.ESCursor;
import moaon.backend.global.domain.SearchKeyword;

@Builder
public record ArticleESQuery(
        SearchKeyword search,
        Sector sector,
        List<Topic> topics,
        List<String> techStackNames,
        ArticleSortType sortBy,
        int limit,
        ESCursor cursor
) {

    public static ArticleESQuery from(
            String search,
            String sector,
            List<String> topics,
            List<String> techStackNames,
            String sortType,
            int limit,
            String cursor
    ) {
        ArticleSortType sortBy = createArticleSortType(search, sortType);
        return new ArticleESQuery(
                new SearchKeyword(search),
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
                new ESCursor(cursor, sortBy)
        );
    }

    private static ArticleSortType createArticleSortType(String search, String sortType) {
        ArticleSortType selectedSortType = ArticleSortType.from(sortType);
        boolean relevanceButNoSearchKeyword = (ArticleSortType.RELEVANCE == selectedSortType)
                && (search == null || search.isBlank());
        if (relevanceButNoSearchKeyword) {
            return ArticleSortType.CREATED_AT;
        }
        return selectedSortType;
    }
}
