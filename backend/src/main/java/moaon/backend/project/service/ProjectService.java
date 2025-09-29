package moaon.backend.project.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.project.repository.Projects;
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
        Projects projects = projectRepository.findWithSearchConditions(projectQueryCondition);

        List<Project> projectsToReturn = projects.getProjectsToReturn();
        long count = projects.getCount();
        boolean hasNext = projects.hasNext();
        Cursor<?> nextCursor = projects.getNextCursor(projectQueryCondition.projectSortType());

        return PagedProjectResponse.from(projectsToReturn, count, hasNext, nextCursor);
    }

    @Transactional
    public ProjectDetailResponse increaseViewsCount(long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));
        project.addViewCount();

        return ProjectDetailResponse.from(project);
    }
}
