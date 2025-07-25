package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.project.domain.SortBy;

public record ProjectQueryCondition(
        String search,
        List<String> platformNames,
        List<String> categoryNames,
        List<String> organizationNames,
        List<String> techStackNames,
        SortBy sortBy
) {

    public static ProjectQueryCondition of(
            String search,
            List<String> platforms,
            List<String> categories,
            List<String> organizations,
            List<String> techStacks,
            String sortBy
    ) {
        return new ProjectQueryCondition(search, platforms, categories, organizations, techStacks, SortBy.from(sortBy));
    }
}
