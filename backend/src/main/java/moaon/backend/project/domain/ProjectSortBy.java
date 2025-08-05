package moaon.backend.project.domain;

import java.util.Arrays;

public enum ProjectSortBy {

    CREATED_AT("createdAt"),
    VIEWS("views"),
    LOVES("loves");

    private final String sortType;

    ProjectSortBy(String sortType) {
        this.sortType = sortType;
    }

    public static ProjectSortBy from(String sortType) {
        return Arrays.stream(ProjectSortBy.values())
                .filter(sortBy -> sortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }
}
