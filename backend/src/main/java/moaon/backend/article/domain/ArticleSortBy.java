package moaon.backend.article.domain;

import java.util.Arrays;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ArticleSortBy {

    CREATED_AT("createdAt"),
    CLICKS("clicks");

    private final String sortType;

    public static ArticleSortBy from(String sortType) {
        return Arrays.stream(ArticleSortBy.values())
                .filter(articleSortBy -> articleSortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }
}
