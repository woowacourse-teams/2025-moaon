package moaon.backend.project.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.dto.ProjectSummaryResponse;
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

    public List<ProjectSummaryResponse> getAllProjects(ProjectQueryCondition projectQueryCondition) {
        List<Project> projects = projectRepository.findWithSearchConditions(projectQueryCondition);

        return ProjectSummaryResponse.from(projects);
    }

    @Transactional
    public void increaseViewsCount(long id) {
        try{
            projectRepository.incrementViews(id);
        }catch (Exception e){
            log.error(e.getMessage()); //로깅 형식 추천좀요
        }
    }
}
