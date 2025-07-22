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
    public List<Project> findWithSearchConditions(ProjectQueryCondition projectQueryCondition) {
        String search = projectQueryCondition.search();
        SortBy sortBy = projectQueryCondition.sortBy();

        return jpaQueryFactory.selectFrom(project)
                .where(toContainsSearch(search))
                .orderBy(toOrderBy(sortBy))
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
