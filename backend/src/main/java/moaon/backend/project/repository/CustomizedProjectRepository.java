package moaon.backend.project.repository;

import moaon.backend.project.dto.ProjectQueryCondition;

public interface CustomizedProjectRepository {

    Projects findWithSearchConditions(ProjectQueryCondition projectQueryCondition);
}
