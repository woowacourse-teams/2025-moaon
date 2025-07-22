package moaon.backend.project.domain;

import java.util.Arrays;

public enum SortBy {
    CREATED_AT("createdAt"),
    VIEWS("views"),
    LOVES("loves");

    private final String sortType;

    SortBy(String sortType) {
        this.sortType = sortType;
    }

    public static SortBy from(String sortType) {
        return Arrays.stream(SortBy.values())
                .filter(sortBy -> sortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }
}
