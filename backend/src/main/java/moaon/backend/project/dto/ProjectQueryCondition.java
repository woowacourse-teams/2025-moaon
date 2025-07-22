package moaon.backend.project.dto;

import moaon.backend.project.domain.SortBy;

public record ProjectQueryCondition(
        String search,
        SortBy sortBy
) {
}
