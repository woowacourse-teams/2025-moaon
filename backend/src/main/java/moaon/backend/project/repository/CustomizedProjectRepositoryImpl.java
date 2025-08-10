package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;
import static moaon.backend.project.domain.QProjectCategory.projectCategory;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.querymodifier.ProjectCategoriesModifier;
import moaon.backend.project.repository.querymodifier.ProjectCursorModifier;
import moaon.backend.project.repository.querymodifier.ProjectSearchKeywordModifier;
import moaon.backend.project.repository.querymodifier.ProjectSortByModifier;
import moaon.backend.project.repository.querymodifier.ProjectTechStacksModifier;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition condition) {
        JPAQuery<Project> query = jpaQueryFactory.selectFrom(project)
                .distinct()
                .leftJoin(project.categories, projectCategory)
                .leftJoin(project.techStacks, techStack);

        return query.groupBy(project.id)
                .where(constructWhereClause(condition, query))
                .orderBy(new ProjectSortByModifier().modify(condition))
                .limit(condition.limit() + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    @Override
    public long countWithSearchCondition(ProjectQueryCondition condition) {
        JPAQuery<Long> query = jpaQueryFactory.select(project.countDistinct())
                .from(project)
                .leftJoin(project.categories, projectCategory)
                .leftJoin(project.techStacks, techStack);

        return query.groupBy(project.id)
                .where(constructWhereClause(condition, query))
                .fetch()
                .size();
    }

    private BooleanBuilder constructWhereClause(
            ProjectQueryCondition queryCondition,
            JPAQuery<?> query
    ) {
        BooleanBuilder whereBuilder = new BooleanBuilder();

        new ProjectTechStacksModifier(query, whereBuilder).modify(queryCondition);
        new ProjectCategoriesModifier(query, whereBuilder).modify(queryCondition);
        new ProjectSearchKeywordModifier(whereBuilder).modify(queryCondition);
        new ProjectCursorModifier(whereBuilder).modify(queryCondition);

        return whereBuilder;
    }
}
