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
import moaon.backend.project.repository.querymodifier.CategoriesModifier;
import moaon.backend.project.repository.querymodifier.CursorModifier;
import moaon.backend.project.repository.querymodifier.SearchKeywordModifier;
import moaon.backend.project.repository.querymodifier.SortByModifier;
import moaon.backend.project.repository.querymodifier.TechStacksModifier;
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
                .orderBy(new SortByModifier().modify(condition))
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

        new TechStacksModifier(query, whereBuilder).modify(queryCondition);
        new CategoriesModifier(query, whereBuilder).modify(queryCondition);
        new SearchKeywordModifier(whereBuilder).modify(queryCondition);
        new CursorModifier(whereBuilder).modify(queryCondition);

        return whereBuilder;
    }
}
