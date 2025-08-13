package moaon.backend.project.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectDetailResponse getById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));

        return ProjectDetailResponse.from(project);
    }

    public PagedProjectResponse getPagedProjects(ProjectQueryCondition projectQueryCondition) {
        List<Project> projects = projectRepository.findWithSearchConditions(projectQueryCondition);
        long totalCount = projectRepository.countWithSearchCondition(projectQueryCondition);

        if (projects.size() > projectQueryCondition.limit()) {
            List<Project> projectsToReturn = projects.subList(0, projectQueryCondition.limit());
            Project lastProject = projectsToReturn.getLast();

            ProjectCursor<?> projectCursor = projectQueryCondition.projectSortType().toCursor(lastProject);

            return PagedProjectResponse.from(
                    projectsToReturn,
                    totalCount,
                    true,
                    projectCursor.getNextCursor()
            );
        }

        return PagedProjectResponse.from(projects, totalCount, false, null);
    }

    @Transactional
    public ProjectDetailResponse increaseViewsCount(long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));
        project.addViewCount();

        return ProjectDetailResponse.from(project);
    }
}
