package moaon.backend.project.service;

import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import moaon.backend.project.domain.Images;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectCreateRequest;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.CategoryRepository;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.repository.TechStackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final TechStackRepository techStackRepository;
    private final CategoryRepository categoryRepository;

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

            Cursor<?> projectCursor = projectQueryCondition.projectSortType().toCursor(lastProject);

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

    @Transactional
    public Long save(ProjectCreateRequest from) {
        // TODO: 로그인 기능 구현
        Member member = memberRepository.findById(1L).orElseThrow();
        Project project = new Project(
                from.title(),
                from.summary(),
                from.description(),
                from.githubUrl(),
                from.productionUrl(),
                new Images(from.imageUrls()),
                member,
                from.techStacks().stream()
                        .map(techStackRepository::findByName)
                        .toList(),
                from.categories().stream()
                        .map(categoryRepository::findByName)
                        .toList(),
                LocalDateTime.now()
        );

        Project saved = projectRepository.save(project);
        return saved.getId();
    }
}
