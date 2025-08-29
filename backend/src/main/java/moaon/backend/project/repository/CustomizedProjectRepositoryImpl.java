package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;
import static moaon.backend.project.domain.QProjectCategory.projectCategory;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectSortType;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";
    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition condition) {
        Cursor<?> cursor = condition.cursor();

        JPAQuery<Project> query = jpaQueryFactory.selectFrom(project)
                .distinct()
                .leftJoin(project.categories, projectCategory)
                .leftJoin(project.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        applyWhereAndHaving(whereBuilder, condition, query);

        if (cursor != null) {
            cursor.applyCursor(whereBuilder);
        }

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }

        return query.groupBy(project.id)
                .orderBy(toOrderBy(condition.projectSortType()))
                .limit(condition.limit() + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    @Override
    public long countWithSearchCondition(ProjectQueryCondition condition) {
        JPAQuery<Long> query = jpaQueryFactory.select(project.countDistinct())
                .from(project)
                .leftJoin(project.categories, projectCategory)
                .leftJoin(project.techStacks, techStack);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        applyWhereAndHaving(whereBuilder, condition, query);

        if (whereBuilder.hasValue()) {
            query.where(whereBuilder);
        }

        return query.groupBy(project.id)
                .fetch()
                .size();
    }

    private void applyWhereAndHaving(
            BooleanBuilder whereBuilder,
            ProjectQueryCondition queryCondition,
            JPAQuery<?> query
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

        SearchKeyword searchKeyword = queryCondition.search();
        if (searchKeyword.hasValue()) {
            whereBuilder.and(satisfiesMatchScore(searchKeyword));
        }
    }

    private BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
        return Expressions.numberTemplate(
                Double.class,
                ProjectFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                formatSearchKeyword(searchKeyword)
        ).gt(MINIMUM_MATCH_SCORE);
    }

    private String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(this::applyExpressions)
                .collect(Collectors.joining(BLANK));
    }

    private String applyExpressions(String keyword) {
        if (keyword.length() == 1) {
            return String.format("%s*", keyword);
        }
        return String.format("+%s*", keyword.toLowerCase());
    }

    private OrderSpecifier<?>[] toOrderBy(ProjectSortType sortBy) {
        if (sortBy == ProjectSortType.CREATED_AT) {
            return new OrderSpecifier<?>[]{project.createdAt.desc(), project.id.desc()};
        }

        if (sortBy == ProjectSortType.VIEWS) {
            return new OrderSpecifier<?>[]{project.views.desc(), project.id.desc()};
        }

        return new OrderSpecifier<?>[]{project.lovedMembers.size().desc(), project.id.desc()};
    }
}
