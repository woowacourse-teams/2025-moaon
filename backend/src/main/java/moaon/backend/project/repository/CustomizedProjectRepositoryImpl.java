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

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition condition) {
        return jpaQueryFactory.selectFrom(project)
                .where(
                        toContainsSearch(condition.search()),
                        toContainsCategory(condition.categoryNames()),
                        toContainsTechStacks(condition.techStackNames())
                )
                .orderBy(toOrderBy(condition.sortBy()))
                .fetch();
    }

    @Override
    public void incrementViews(Long id) {
        jpaQueryFactory.update(project)
                .set(project.views, project.views.add(1))
                .where(project.id.eq(id))
                .execute();
    }

    private BooleanExpression toContainsSearch(String search) {
        if (StringUtils.hasText(search)) {
            return project.title.contains(search)
                    .or(project.summary.contains(search))
                    .or(project.description.contains(search));
        }

        return null;
    }

    private BooleanExpression toContainsCategory(List<String> categoryNames) {
        if (categoryNames == null || categoryNames.isEmpty()) {
            return null;
        }

        return project.categories.any().name.in(categoryNames);
    }

    private BooleanExpression toContainsTechStacks(List<String> techStackNames) {
        if (techStackNames == null || techStackNames.isEmpty()) {
            return null;
        }

        return project.techStacks.any().name.in(techStackNames);
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
