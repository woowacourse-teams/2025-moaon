package moaon.backend.project.repository;

import java.util.List;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.project.domain.Projects;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.techStack.domain.ProjectTechStack;

public interface CustomizedProjectRepository {

    Projects findWithSearchConditions(ProjectQueryCondition projectQueryCondition);

    Project findProjectWithMemberJoin(Long id);

    List<ProjectCategory> findProjectCategoriesByProjectId(Long id);

    List<ProjectTechStack> findProjectTechStacksByProjectId(Long id);
}
