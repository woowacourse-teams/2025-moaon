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

    /**
     * Creates a new {@code ProjectQueryCondition} instance using the provided search term, filter lists, and sorting criteria.
     *
     * @param search        the search keyword to filter projects
     * @param platforms     the list of platform names to filter by
     * @param categories    the list of category names to filter by
     * @param organizations the list of organization names to filter by
     * @param techStacks    the list of technology stack names to filter by
     * @param sortBy        the sorting criteria as a string
     * @return a {@code ProjectQueryCondition} initialized with the specified filters and sorting
     */
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
