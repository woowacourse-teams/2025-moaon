package moaon.backend.project.repository;

import java.util.List;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;

public interface CustomizedProjectRepository {

    List<Project> findWithSearchConditions(ProjectQueryCondition projectQueryCondition);

    void incrementViews(Long id);
}
