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
import moaon.backend.member.service.OAuthService;
import moaon.backend.project.domain.Images;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.Projects;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectCreateRequest;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.repository.CategoryRepository;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.repository.TechStackRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final OAuthService oAuthService;
    private final TechStackRepository techStackRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;

    @Value("${s3.region}")
    private String region;
    @Value("${s3.bucket}")
    private String bucket;

    public ProjectDetailResponse getById(Long id) {
        Project project = projectRepository.findProjectById(id);

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

    @Transactional
    public Long save(String token, ProjectCreateRequest request) {
        Member member = oAuthService.getUserByToken(token);
        Project project = new Project(
                request.title(),
                request.summary(),
                request.description(),
                request.githubUrl(),
                request.productionUrl(),
                imagesFrom(request.imageKeys()),
                member,
                request.techStacks().stream()
                        .map(
                                techStack -> techStackRepository.findByName(techStack)
                                        .orElseThrow(() -> new CustomException(ErrorCode.TECHSTACK_NOT_FOUND))
                        )
                        .toList(),
                request.categories().stream()
                        .map(
                                category -> categoryRepository.findByName(category)
                                        .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND))
                        )
                        .toList(),
                LocalDateTime.now()
        );

        Project saved = projectRepository.save(project);
        return saved.getId();
    }

    private Images imagesFrom(List<String> imageKeys) {
        // https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/projects/~~.png
        List<String> urls = imageKeys.stream()
                .map(k -> String.format("https://%s.s3.%s.amazonaws.com/%s", bucket, region, k))
                .toList();
        return new Images(urls);
    }
}
