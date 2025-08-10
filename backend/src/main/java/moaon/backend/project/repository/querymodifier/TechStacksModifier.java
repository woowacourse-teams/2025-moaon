package moaon.backend.project.repository.querymodifier;

import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.repository.QueryModifier;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.util.CollectionUtils;

@RequiredArgsConstructor
public class TechStacksModifier implements QueryModifier<Void, ProjectQueryCondition> {

    private final JPAQuery<?> query;
    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ProjectQueryCondition condition) {
        List<String> techStackNames = condition.techStackNames();
        if (!CollectionUtils.isEmpty(techStackNames)) {
            whereBuilder.and(techStack.name.in(techStackNames));
            query.having(techStack.name.countDistinct().eq((long) techStackNames.size()));
        }

        return null;
    }
}
