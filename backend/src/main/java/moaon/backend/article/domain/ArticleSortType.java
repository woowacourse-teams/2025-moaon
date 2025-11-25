package moaon.backend.article.domain;

import java.util.Arrays;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ArticleSortType {

    CREATED_AT("createdAt"),
    CLICKS("clicks"),
    RELEVANCE("relevance");

    private final String sortType;

    public static ArticleSortType from(String sortType) {
        return Arrays.stream(ArticleSortType.values())
                .filter(articleSortBy -> articleSortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }
}
