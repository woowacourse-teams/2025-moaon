package moaon.backend.project.domain;

import java.util.Arrays;

public enum ProjectSortType {

    CREATED_AT("createdAt"),
    VIEWS("views"),
    LOVES("loves");

    private final String sortType;

    ProjectSortType(String sortType) {
        this.sortType = sortType;
    }

    public static ProjectSortType from(String sortType) {
        return Arrays.stream(ProjectSortType.values())
                .filter(sortBy -> sortBy.sortType.equals(sortType))
                .findAny()
                .orElse(CREATED_AT);
    }
}
