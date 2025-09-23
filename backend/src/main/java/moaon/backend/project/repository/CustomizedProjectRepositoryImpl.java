package moaon.backend.project.repository;

import static moaon.backend.project.domain.QCategory.category;
import static moaon.backend.project.domain.QProject.project;
import static moaon.backend.project.domain.QProjectCategory.projectCategory;
import static moaon.backend.techStack.domain.QProjectTechStack.projectTechStack;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
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

    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;
    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition condition) {
        SearchKeyword searchKeyword = condition.search();
        List<String> techStackNames = condition.techStackNames();
        List<String> categoryNames = condition.categoryNames();
        ProjectSortType sortBy = condition.projectSortType();
        Cursor<?> cursor = condition.cursor();
        int limit = condition.limit();

        return jpaQueryFactory
                .selectFrom(project).distinct()
                .leftJoin(project.categories, projectCategory)
                .leftJoin(project.techStacks, projectTechStack)
                .where(
                        techStackNamesIn(techStackNames),
                        categoryNamesIn(categoryNames),
                        satisfiesMatchScore(searchKeyword),
                        applyCursor(cursor)
                )
                .having(
                        hasExactTechStackCount(techStackNames),
                        hasExactCategoryCount(categoryNames)
                )
                .groupBy(project.id)
                .orderBy(toOrderBy(sortBy))
                .limit(limit + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    @Override
    public long countWithSearchCondition(ProjectQueryCondition condition) {
        SearchKeyword searchKeyword = condition.search();
        List<String> techStackNames = condition.techStackNames();
        List<String> categoryNames = condition.categoryNames();

        return jpaQueryFactory
                .select(project.countDistinct())
                .from(project)
                .leftJoin(project.categories, projectCategory)
                .leftJoin(project.techStacks, projectTechStack)
                .where(
                        techStackNamesIn(techStackNames),
                        categoryNamesIn(categoryNames),
                        satisfiesMatchScore(searchKeyword)
                )
                .having(
                        hasExactTechStackCount(techStackNames),
                        hasExactCategoryCount(categoryNames)
                )
                .groupBy(project.id)
                .fetch()
                .size();
    }

    private BooleanExpression techStackNamesIn(List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return null;
        }
        return techStack.name.in(techStackNames);
    }

    private BooleanExpression categoryNamesIn(List<String> categoryNames) {
        if (CollectionUtils.isEmpty(categoryNames)) {
            return null;
        }
        return category.name.in(categoryNames);
    }

    private BooleanExpression hasExactTechStackCount(List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return null;
        }
        return techStack.name.countDistinct()
                .eq((long) techStackNames.size());
    }

    private BooleanExpression hasExactCategoryCount(List<String> categoryNames) {
        if (CollectionUtils.isEmpty(categoryNames)) {
            return null;
        }
        return category.name.countDistinct()
                .eq((long) categoryNames.size());
    }

    private BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return null;
        }
        return Expressions.numberTemplate(
                        Double.class,
                        ProjectFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                        formatSearchKeyword(searchKeyword)
                )
                .gt(MINIMUM_MATCH_SCORE);
    }

    private BooleanExpression applyCursor(Cursor<?> cursor) {
        if (cursor == null) {
            return null;
        }
        return cursor.getCursorExpression();
    }

    private String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(this::applyBooleanModeExpression)
                .collect(Collectors.joining(BLANK));
    }

    private String applyBooleanModeExpression(String keyword) {
        if (keyword.length() == 1) {
            return keyword + "*";
        }
        return "+" + keyword.toLowerCase() + "*";
    }

    private OrderSpecifier<?>[] toOrderBy(ProjectSortType sortBy) {
        if (sortBy == ProjectSortType.CREATED_AT) {
            return new OrderSpecifier<?>[]{project.createdAt.desc(), project.id.desc()};
        }

        if (sortBy == ProjectSortType.VIEWS) {
            return new OrderSpecifier<?>[]{project.views.desc(), project.id.desc()};
        }

        if (sortBy == ProjectSortType.ARTICLE_COUNT) {
            return new OrderSpecifier<?>[]{project.articles.size().desc(), project.id.desc()};
        }

        return new OrderSpecifier<?>[]{project.lovedMembers.size().desc(), project.id.desc()};
    }
}
