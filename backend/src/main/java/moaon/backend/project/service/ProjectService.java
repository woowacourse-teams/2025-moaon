package moaon.backend.project.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.love.repository.LoveRepository;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.dto.ProjectSummaryResponse;
import moaon.backend.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final LoveRepository loveRepository;

    @Transactional
    public ProjectDetailResponse getById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));

        project.addViewCount();

        int loves = loveRepository.countLoveByProjectId(id);
        return ProjectDetailResponse.from(project, loves);
    }

    public List<ProjectSummaryResponse> getAllProjects(
            String search,
            List<String> platformNames,
            List<String> categoryNames,
            List<String> organizationNames,
            List<String> techStackNames
    ) {
        ProjectQueryCondition projectQueryCondition = new ProjectQueryCondition(
                search,
                platformNames,
                categoryNames,
                organizationNames,
                techStackNames
        );
        List<Project> projects = projectRepository.findWithSearchConditions(projectQueryCondition);

        List<Integer> loves = projects.stream()
                .map(Project::getId)
                .map(loveRepository::countLoveByProjectId)
                .toList();
        return ProjectSummaryResponse.from(projects, loves);
    }
}
