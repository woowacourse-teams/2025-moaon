package moaon.backend.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.QProject;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ProjectRepositoryImpl implements ProjectRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition projectQueryCondition) {
        QProject qProject = QProject.project;

        return jpaQueryFactory.selectFrom(qProject)
                .fetch();
    }
}
