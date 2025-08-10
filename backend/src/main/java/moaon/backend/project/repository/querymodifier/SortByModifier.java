package moaon.backend.project.repository.querymodifier;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.types.OrderSpecifier;
import moaon.backend.global.repository.QueryModifier;
import moaon.backend.project.domain.ProjectSortType;
import moaon.backend.project.dto.ProjectQueryCondition;

public class SortByModifier implements QueryModifier<OrderSpecifier<?>[], ProjectQueryCondition> {

    @Override
    public OrderSpecifier<?>[] modify(ProjectQueryCondition condition) {
        ProjectSortType sortBy = condition.projectSortType();
        if (sortBy == ProjectSortType.CREATED_AT) {
            return new OrderSpecifier<?>[]{project.createdAt.desc(), project.id.desc()};
        }

        if (sortBy == ProjectSortType.VIEWS) {
            return new OrderSpecifier<?>[]{project.views.desc(), project.id.desc()};
        }

        return new OrderSpecifier<?>[]{project.lovedMembers.size().desc(), project.id.desc()};
    }
}
