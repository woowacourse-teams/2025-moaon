package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition projectQueryCondition) {
        String search = projectQueryCondition.search();

        return jpaQueryFactory.selectFrom(project)
                .where(toContainsSearch(search))
                .fetch();
    }

    private BooleanBuilder toContainsSearch(String search) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (StringUtils.hasText(search)) {
            return booleanBuilder.or(project.title.contains(search)
                    .or(project.summary.contains(search))
                    .or(project.description.contains(search)));
        }

        return booleanBuilder;
    }
}
