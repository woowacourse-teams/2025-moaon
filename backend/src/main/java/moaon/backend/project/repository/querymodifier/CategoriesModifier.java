package moaon.backend.project.repository.querymodifier;

import static moaon.backend.project.domain.QProjectCategory.projectCategory;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.repository.QueryModifier;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.util.CollectionUtils;

@RequiredArgsConstructor
public final class CategoriesModifier implements QueryModifier<Void, ProjectQueryCondition> {

    private final JPAQuery<?> query;
    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        List<String> categoryNames = condition.categoryNames();
        if (!CollectionUtils.isEmpty(categoryNames)) {
            whereBuilder.and(projectCategory.name.in(categoryNames));
            query.having(projectCategory.name.countDistinct().eq((long) categoryNames.size()));
        }

        return null;
    }
}
