package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;
import static moaon.backend.project.domain.QProjectCategory.projectCategory;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.config.FullTextSearchHQLFunction;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectSortBy;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";
    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition condition) {
        ProjectCursor<?> cursor = condition.cursor();

        JPAQuery<Project> query = jpaQueryFactory.selectFrom(project)
                .distinct()
                .leftJoin(project.categories, projectCategory)
                .leftJoin(project.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        applyWhereAndHaving(whereBuilder, condition, query);

        toContainsSearch(condition.search(), whereBuilder);

        if (cursor != null) {
            cursor.applyCursor(condition, whereBuilder);
        }

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }

        return query.groupBy(project.id)
                .orderBy(toOrderBy(condition.projectSortBy()))
                .limit(condition.limit() + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    private void applyWhereAndHaving(
            BooleanBuilder whereBuilder,
            ProjectQueryCondition queryCondition,
            JPAQuery<Project> query
    ) {
        List<String> techStackNames = queryCondition.techStackNames();
        List<String> categoryNames = queryCondition.categoryNames();

        if (!CollectionUtils.isEmpty(techStackNames)) {
            whereBuilder.and(techStack.name.in(techStackNames));
            query.having(techStack.name.countDistinct().eq((long) techStackNames.size()));
        }

        if (!CollectionUtils.isEmpty(categoryNames)) {
            whereBuilder.and(projectCategory.name.in(categoryNames));
            query.having(projectCategory.name.countDistinct().eq((long) categoryNames.size()));
        }
    }

    private void toContainsSearch(String search, BooleanBuilder whereBuilder) {
        if (!StringUtils.hasText(search)) {
            return;
        }

        String searchFormat = formatSearchKeyword(search);

        whereBuilder.and(
                Expressions.numberTemplate(
                        Double.class,
                        FullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                        searchFormat
                ).gt(MINIMUM_MATCH_SCORE)
        );
    }


    private String formatSearchKeyword(String search) {
        return Arrays.stream(search.split(BLANK))
                .map(keyword -> String.format("+%s*", keyword))
                .collect(Collectors.joining(BLANK));
    }

    private OrderSpecifier<?>[] toOrderBy(ProjectSortBy sortBy) {
        if (sortBy == ProjectSortBy.CREATED_AT) {
            return new OrderSpecifier<?>[]{project.createdAt.desc(), project.id.desc()};
        }

        if (sortBy == ProjectSortBy.VIEWS) {
            return new OrderSpecifier<?>[]{project.views.desc(), project.id.desc()};
        }

        return new OrderSpecifier<?>[]{project.lovedMembers.size().desc(), project.id.desc()};
    }
}
