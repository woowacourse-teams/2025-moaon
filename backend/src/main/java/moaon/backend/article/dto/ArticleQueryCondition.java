package moaon.backend.article.dto;

import java.util.List;
import java.util.Objects;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;

public record ArticleQueryCondition(
        SearchKeyword search,
        Sector sector,
        List<Topic> topics,
        List<String> techStackNames,
        ArticleSortType sortBy,
        int limit,
        Cursor<?> articleCursor
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
        ArticleSortType sortBy = ArticleSortType.from(sortType);
        return new ArticleQueryCondition(
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
                sortBy.toCursor(cursor)
        );
    }
}
