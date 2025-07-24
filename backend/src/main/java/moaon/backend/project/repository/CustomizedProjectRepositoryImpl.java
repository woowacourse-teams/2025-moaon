package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.SortBy;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * Retrieves a list of projects that match the specified search and filter conditions.
     *
     * Applies optional filters for text search, platform names, category names, organization names, and technology stack names.
     * Results are ordered according to the provided sorting criterion.
     *
     * @param condition the search and filter criteria for querying projects
     * @return a list of projects matching the given conditions
     */
    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition condition) {
        return jpaQueryFactory.selectFrom(project)
                .where(
                        toContainsSearch(condition.search()),
                        toContainsPlatform(condition.platformNames()),
                        toContainsCategory(condition.categoryNames()),
                        toContainsOrganization(condition.organizationNames()),
                        toContainsTechStacks(condition.techStackNames())
                )
                .orderBy(toOrderBy(condition.sortBy()))
                .fetch();
    }

    /**
     * Builds a BooleanExpression to filter projects whose title, summary, or description contains the given search string.
     *
     * @param search the text to search for in project fields; if null or empty, no filter is applied
     * @return a BooleanExpression for the search filter, or null if the search string is empty or null
     */
    private BooleanExpression toContainsSearch(String search) {
        if (StringUtils.hasText(search)) {
            return project.title.contains(search)
                    .or(project.summary.contains(search))
                    .or(project.description.contains(search));
        }

        return null;
    }

    /**
     * Creates a filter expression to match projects with at least one platform whose name is in the given list.
     *
     * @param platformNames the list of platform names to filter by; if null or empty, no filter is applied
     * @return a BooleanExpression for the platform name filter, or null if no filtering is needed
     */
    private BooleanExpression toContainsPlatform(List<String> platformNames) {
        if (platformNames == null || platformNames.isEmpty()) {
            return null;
        }

        return project.platforms.any().name.in(platformNames);
    }

    /**
     * Builds a filter expression to match projects containing any category with a name in the provided list.
     *
     * @param categoryNames list of category names to filter by; if null or empty, no filter is applied
     * @return a BooleanExpression for category name filtering, or null if no filtering is needed
     */
    private BooleanExpression toContainsCategory(List<String> categoryNames) {
        if (categoryNames == null || categoryNames.isEmpty()) {
            return null;
        }

        return project.categories.any().name.in(categoryNames);
    }

    /**
     * Creates a filter expression to match projects whose organization name is in the provided list.
     *
     * @param organizationNames list of organization names to filter by; if null or empty, no filter is applied
     * @return a BooleanExpression for the organization name filter, or null if no filtering is needed
     */
    private BooleanExpression toContainsOrganization(List<String> organizationNames) {
        if (organizationNames == null || organizationNames.isEmpty()) {
            return null;
        }

        return project.organization.name.in(organizationNames);
    }

    /**
     * Creates a filter expression to match projects containing any of the specified tech stack names.
     *
     * @param techStackNames the list of tech stack names to filter by; if null or empty, no filter is applied
     * @return a BooleanExpression for filtering by tech stack names, or null if no filtering is needed
     */
    private BooleanExpression toContainsTechStacks(List<String> techStackNames) {
        if (techStackNames == null || techStackNames.isEmpty()) {
            return null;
        }

        return project.techStacks.any().name.in(techStackNames);
    }

    /**
     * Returns an {@link OrderSpecifier} for sorting projects based on the specified {@code SortBy} criterion.
     *
     * @param sortBy the sorting criterion to apply (e.g., by views, loves, or creation date)
     * @return an {@code OrderSpecifier} for descending order by the chosen field
     */
    private OrderSpecifier<?> toOrderBy(SortBy sortBy) {
        if (sortBy == SortBy.VIEWS) {
            return new OrderSpecifier<>(Order.DESC, project.views);
        }

        if (sortBy == SortBy.LOVES) {
            return new OrderSpecifier<>(Order.DESC, project.lovedMembers.size());
        }

        return new OrderSpecifier<>(Order.DESC, project.createdAt);
    }
}
