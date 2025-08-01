package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.project.domain.SortBy;

public record ProjectQueryCondition(
        String search,
        List<String> categoryNames,
        List<String> techStackNames,
        SortBy sortBy
) {

    public static ProjectQueryCondition of(
            String search,
            List<String> categories,
            List<String> techStacks,
            String sortBy
    ) {
        return new ProjectQueryCondition(search, categories, techStacks, SortBy.from(sortBy));
    }
}
