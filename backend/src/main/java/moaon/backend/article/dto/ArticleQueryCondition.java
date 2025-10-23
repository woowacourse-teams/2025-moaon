package moaon.backend.article.dto;

import java.util.List;
import java.util.Objects;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

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
        ArticleSortType sortBy = createArticleSortType(search, sortType);
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
                cursor == null ? null : new ArticleCursor(cursor)
        );
    }

    public static ArticleQueryCondition fromProjectDetail(
            ProjectArticleQueryCondition pac
    ) {
        return new ArticleQueryCondition(
                pac.search(),
                pac.sector(),
                List.of(),
                List.of(),
                ArticleSortType.CREATED_AT, // 프로젝트 상세 페이지 정렬옵션 정책 없으므로 기본값
                999, // 프로젝트 상세 페이지 무제한 페이징
                null
        );
    }

    private static ArticleSortType createArticleSortType(String search, String sortType) {
        boolean noSortButHasSearchKeyword =
                (sortType == null || sortType.isBlank()) && (search != null && !search.isBlank());
        if (noSortButHasSearchKeyword) {
            return ArticleSortType.RELEVANCE;
        }
        return ArticleSortType.from(sortType);
    }
}
