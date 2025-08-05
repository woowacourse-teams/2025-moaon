package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.config.FullTextSearchHQLFunction;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.SortBy;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";

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

    private BooleanExpression toContainsSearch(String search) {
        if (StringUtils.hasText(search)) {
            return satisfiesMatchScore(search);
        }

        return null;
    }

    private BooleanExpression satisfiesMatchScore(String search) {
        return Expressions.numberTemplate(
                Double.class,
                FullTextSearchHQLFunction.PROJECT_EXPRESSION_TEMPLATE,
                formatSearchKeyword(search)
        ).gt(MINIMUM_MATCH_SCORE);
    }

    private String formatSearchKeyword(String search) {
        return Arrays.stream(search.split(BLANK))
                .map(keyword -> String.format("+%s*", keyword))
                .collect(Collectors.joining(BLANK));
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
