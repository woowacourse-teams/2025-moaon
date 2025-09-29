package moaon.backend.project.dao;

import static moaon.backend.project.domain.QProject.project;
import static moaon.backend.project.domain.QProjectCategory.projectCategory;
import static moaon.backend.techStack.domain.QProjectTechStack.projectTechStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectSortType;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.ProjectFullTextSearchHQLFunction;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class ProjectDao {

    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";
    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;

    private final JPAQueryFactory jpaQueryFactory;

    public List<Project> findProjects(ProjectQueryCondition condition, Set<Long> projectIdsByFilter) {
        Cursor<?> cursor = condition.cursor();
        ProjectSortType sortBy = condition.projectSortType();
        int limit = condition.limit();

        Predicate idInCondition = null;
        if (projectIdsByFilter != null) {
            if (!projectIdsByFilter.isEmpty()) {
                idInCondition = project.id.in(projectIdsByFilter);
            }
        }

        return jpaQueryFactory.selectFrom(project)
                .where(idInCondition)
                .where(applyCursor(cursor))
                .orderBy(toOrderBy(sortBy))
                .limit(limit + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    public Set<Long> findProjectIdsByTechStacks(List<String> techStacks) {
        if (CollectionUtils.isEmpty(techStacks)) {
            return new HashSet<>();
        }

        return new HashSet<>(jpaQueryFactory.select(projectTechStack.project.id)
                .from(projectTechStack)
                .where(projectTechStack.techStack.name.in(techStacks))
                .groupBy(projectTechStack.project.id)
                .having(projectTechStack.techStack.name.countDistinct().eq((long) techStacks.size()))
                .fetch());
    }

    public Set<Long> findProjectIdsByCategories(List<String> categories) {
        if (CollectionUtils.isEmpty(categories)) {
            return new HashSet<>();
        }

        return new HashSet<>(jpaQueryFactory.select(projectCategory.project.id)
                .from(projectCategory)
                .where(projectCategory.category.name.in(categories))
                .groupBy(projectCategory.project.id)
                .having(projectCategory.category.name.countDistinct().eq((long) categories.size()))
                .fetch());
    }

    public Set<Long> findProjectIdsBySearchKeyword(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return new HashSet<>();
        }

        return new HashSet<>(jpaQueryFactory.select(project.id)
                .from(project)
                .where(satisfiesMatchScore(searchKeyword))
                .fetch());
    }

    public long count() {
        return Optional.ofNullable(jpaQueryFactory.select(Wildcard.count)
                .from(project)
                .fetchOne()).orElse(0L);
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

    private BooleanExpression applyCursor(Cursor<?> cursor) {
        if (cursor == null) {
            return null;
        }
        return cursor.getCursorExpression();
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
