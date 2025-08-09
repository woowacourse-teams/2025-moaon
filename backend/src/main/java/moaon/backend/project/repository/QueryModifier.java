package moaon.backend.project.repository;

import moaon.backend.project.dto.ProjectQueryCondition;

public interface QueryModifier<T> {

    T modify(ProjectQueryCondition condition);
}
