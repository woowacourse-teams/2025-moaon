package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
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
                .where(toContainsSearch(condition.search()))
                .orderBy(toOrderBy(condition.sortBy()))
                .fetch();
    }

    private BooleanBuilder toContainsSearch(String search) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (StringUtils.hasText(search)) {
            return booleanBuilder.or(project.title.contains(search)
                    .or(project.summary.contains(search))
                    .or(project.description.contains(search)));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsPlatform(List<String> platformNames) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (platformNames != null && !platformNames.isEmpty()) {
            return booleanBuilder.and(project.platforms.any().name.in(platformNames));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsCategory(List<String> categoryNames) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (categoryNames != null && !categoryNames.isEmpty()) {
            return booleanBuilder.and(project.categories.any().name.in(categoryNames));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsOrganization(List<String> organizationNames) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (organizationNames != null && !organizationNames.isEmpty()) {
            return booleanBuilder.and(project.organization.name.in(organizationNames));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsTechStacks(List<String> techStackNames) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (techStackNames != null && !techStackNames.isEmpty()) {
            return booleanBuilder.and(project.techStacks.any().name.in(techStackNames));
        }

        return booleanBuilder;
    }

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
