package moaon.backend.project.dto;

import moaon.backend.project.domain.SortBy;

public record ProjectQueryCondition(
        String search,
        SortBy sortBy
) {

    public static ProjectQueryCondition of(String search, String sortBy) {
        return new ProjectQueryCondition(search, SortBy.from(sortBy));
    }
}
