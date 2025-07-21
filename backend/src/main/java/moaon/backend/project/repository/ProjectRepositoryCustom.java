package moaon.backend.project.repository;

import java.util.List;
import moaon.backend.project.domain.Project;

public interface ProjectRepositoryCustom {

    List<Project> findWithSearchConditions(ProjectQueryCondition projectQueryCondition);
}
