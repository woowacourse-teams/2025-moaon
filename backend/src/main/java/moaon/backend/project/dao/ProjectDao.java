package moaon.backend.project.dao;

import static moaon.backend.member.domain.QMember.member;
import static moaon.backend.project.domain.QCategory.category;
import static moaon.backend.project.domain.QProject.project;
import static moaon.backend.project.domain.QProjectCategory.projectCategory;
import static moaon.backend.techStack.domain.QProjectTechStack.projectTechStack;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.SimpleExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.JPQLQuery;
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
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.project.domain.ProjectSortType;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.FilteringIds;
import moaon.backend.project.repository.ProjectFullTextSearchHQLFunction;
import moaon.backend.techStack.domain.ProjectTechStack;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class ProjectDao {

    private static final String BLANK = " ";

    private final JPAQueryFactory jpaQueryFactory;

    public Optional<Project> findProjectById(Long id) {
        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(project)
                .leftJoin(project.author, member).fetchJoin()
                .where(project.id.eq(id))
                .fetchOne());
    }

    public List<ProjectCategory> findProjectCategoriesByProjectId(Long id) {
        return jpaQueryFactory
                .selectFrom(projectCategory)
                .leftJoin(projectCategory.category, category).fetchJoin()
                .where(projectCategory.project.id.eq(id))
                .fetch();
    }

    public List<ProjectTechStack> findProjectTechStacksByProjectId(Long id) {
        return jpaQueryFactory
                .selectFrom(projectTechStack)
                .leftJoin(projectTechStack.techStack, techStack).fetchJoin()
                .where(projectTechStack.project.id.eq(id))
                .fetch();
    }

    public Set<Long> findProjectIdsByTechStacks(List<String> techStacks) {
        if (CollectionUtils.isEmpty(techStacks)) {
            return new HashSet<>();
        }

        return new HashSet<>(jpaQueryFactory.select(projectTechStack.project.id)
                .from(projectTechStack)
                .where(
                        projectTechStack.techStack.name.in(techStacks)
                )
                .groupBy(projectTechStack.project.id)
                .having(projectTechStack.techStack.name.count().eq((long) techStacks.size()))
                .fetch());
    }

    public Set<Long> findProjectIdsByCategories(List<String> categories) {
        if (CollectionUtils.isEmpty(categories)) {
            return new HashSet<>();
        }

        return new HashSet<>(jpaQueryFactory.select(projectCategory.project.id)
                .from(projectCategory)
                .where(
                        projectCategory.category.name.in(categories)
                )
                .groupBy(projectCategory.project.id)
                .having(projectCategory.category.name.count().eq((long) categories.size()))
                .fetch());
    }

    public Set<Long> findProjectIdsBySearchKeyword(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return new HashSet<>();
        }

        return new HashSet<>(jpaQueryFactory.select(project.id)
                .from(project)
                .where(
                        satisfiesMatchScore(searchKeyword)
                )
                .fetch());
    }

    private BooleanExpression projectIdInFilteringIds(
            FilteringIds filteringIds,
            SimpleExpression<Long> projectIdExpression
    ) {
        if (filteringIds.isHasResult()) {
            return projectIdExpression.in(filteringIds.getIds());
        }

        return null;
    }


    private BooleanExpression idsInCondition(Set<Long> projectIdsByFilter) {
        if (CollectionUtils.isEmpty(projectIdsByFilter)) {
            return null;
        }

        return project.id.in(projectIdsByFilter);
    }

    public List<Project> findProjects(ProjectQueryCondition condition, Set<Long> projectIdsByFilter) {
        Cursor<?> cursor = condition.cursor();
        ProjectSortType sortBy = condition.projectSortType();
        int limit = condition.limit();

        int fetchExtraForHasNext = 1;
        return jpaQueryFactory.selectFrom(project)
                .where(
                        idsInCondition(projectIdsByFilter),
                        applyCursor(cursor)
                )
                .orderBy(toOrderBy(sortBy))
                .limit(limit + fetchExtraForHasNext)
                .fetch();
    }

    public List<Project> findProjects(ProjectQueryCondition condition, List<Long> projectIdsByFilter) {
        Cursor<?> cursor = condition.cursor();
        ProjectSortType sortBy = condition.projectSortType();
        int limit = condition.limit();

        int fetchExtraForHasNext = 1;
        return jpaQueryFactory.selectFrom(project)
                .where(
                        idsInCondition(projectIdsByFilter),
                        applyCursor(cursor)
                )
                .orderBy(toOrderBy(sortBy))
                .limit(limit + fetchExtraForHasNext)
                .fetch();
    }

    public JPQLQuery<Long> findProjectIdsByTechStacks(ProjectIds projectIds, List<String> techStacks) {
        return jpaQueryFactory.select(projectTechStack.project.id)
                .from(projectTechStack)
                .where(
                        projectTechStack.techStack.name.in(techStacks),
                        projectIdInFilteringIds(projectIds, projectTechStack.project.id)
                )
                .groupBy(projectTechStack.project.id)
                .having(projectTechStack.techStack.name.count().eq((long) techStacks.size()));
    }

    public JPQLQuery<Long> findProjectIdsByCategories(ProjectIds projectIds, List<String> categories) {
        return jpaQueryFactory.select(projectCategory.project.id)
                .from(projectCategory)
                .where(
                        projectCategory.category.name.in(categories),
                        projectIdInFilteringIds(projectIds, projectCategory.project.id)
                )
                .groupBy(projectCategory.project.id)
                .having(projectCategory.category.name.count().eq((long) categories.size()));
    }

    public JPQLQuery<Long> findProjectIdsBySearchKeyword(ProjectIds projectIds, SearchKeyword searchKeyword) {
        return jpaQueryFactory.select(project.id)
                .from(project)
                .where(
                        satisfiesMatchScore(searchKeyword),
                        projectIdInFilteringIds(projectIds, project.id)
                );
    }

    public long count() {
        return Optional.ofNullable(jpaQueryFactory.select(Wildcard.count)
                .from(project)
                .fetchOne()).orElse(0L);
    }

    private BooleanExpression projectIdInFilteringIds(
            ProjectIds projectIds,
            SimpleExpression<Long> projectIdExpression
    ) {
        if (projectIds.isHasResult()) {
            return projectIdExpression.in(projectIds.getIds());
        }

        return null;
    }


    private BooleanExpression idsInCondition(List<Long> projectIdsByFilter) {
        if (CollectionUtils.isEmpty(projectIdsByFilter)) {
            return null;
        }

        return project.id.in(projectIdsByFilter);
    }

    private BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return null;
        }
        double minimumMatchScore = 0.0;
        return Expressions.numberTemplate(
                        Double.class,
                        ProjectFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                        formatSearchKeyword(searchKeyword)
                )
                .gt(minimumMatchScore);
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
