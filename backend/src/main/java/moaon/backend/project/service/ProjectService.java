package moaon.backend.project.service;

import lombok.RequiredArgsConstructor;
import moaon.backend.love.repository.LoveRepository;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final LoveRepository loveRepository;

    public ProjectDetailResponse getById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow();
        int loves = loveRepository.countLoveByProjectId(id);
        return ProjectDetailResponse.from(project, loves);
    }
}
