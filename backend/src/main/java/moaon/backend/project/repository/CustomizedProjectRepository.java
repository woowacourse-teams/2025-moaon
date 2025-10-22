package moaon.backend.project.repository;

import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.Projects;
import moaon.backend.project.dto.ProjectQueryCondition;

public interface CustomizedProjectRepository {

    Projects findWithSearchConditions(ProjectQueryCondition projectQueryCondition);
    Project findProjectById(Long id);
}
