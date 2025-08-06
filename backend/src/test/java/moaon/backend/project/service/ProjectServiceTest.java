package moaon.backend.project.service;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.global.cursor.CursorParser;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectSortType;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.project.dto.ProjectSummaryResponse;
import moaon.backend.project.repository.ProjectRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @DisplayName("ID에 해당하는 프로젝트가 존재하지 않는다면 예외가 발생한다.")
    @Test
    void getProjectById() {
        assertThatThrownBy(() -> projectService.getById(1L))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.PROJECT_NOT_FOUND.getMessage());
    }

    @DisplayName("다음 아티클이 존재할 때 nextCursor를 포함하여 아티클을 리턴한다.")
    @Test
    void getPagedArticlesWhenHasNext() {
        // given
        Project project1 = new ProjectFixtureBuilder()
                .id(1L)
                .build();
        Project project2 = new ProjectFixtureBuilder()
                .id(2L)
                .build();
        Project project3 = new ProjectFixtureBuilder()
                .id(3L)
                .build();
        List<Project> projects = List.of(project1, project2, project3);

        ProjectCursor<?> cursor = CursorParser.toCursor(project2, ProjectSortType.CREATED_AT);

        Mockito.when(projectRepository.findWithSearchConditions(Mockito.any()))
                .thenReturn(projects);

        ProjectQueryCondition projectQueryCondition = new ProjectQueryCondition(
                null,
                null,
                null,
                ProjectSortType.CREATED_AT,
                2,
                null
        );

        Mockito.when(projectRepository.countWithSearchCondition(projectQueryCondition)).thenReturn(5L);

        ProjectSummaryResponse projectSummaryResponse1 = ProjectSummaryResponse.from(project1);
        ProjectSummaryResponse projectSummaryResponse2 = ProjectSummaryResponse.from(project2);

        // when
        PagedProjectResponse actual = projectService.getPagedProjects(projectQueryCondition);

        // then
        assertAll(
                () -> assertThat(actual.contents()).containsExactly(projectSummaryResponse1, projectSummaryResponse2),
                () -> assertThat(actual.hasNext()).isTrue(),
                () -> assertThat(actual.totalCount()).isEqualTo(5L),
                () -> assertThat(actual.nextCursor()).isEqualTo(cursor.getNextCursor())
        );
    }

    @DisplayName("다음 아티클이 존재하지 않다면 nextCursor 에 공백을 넣고 리턴한다.")
    @Test
    void getPagedArticlesWhenHasNoNext() {
        // given
        Project project1 = new ProjectFixtureBuilder()
                .id(1L)
                .build();
        Project project2 = new ProjectFixtureBuilder()
                .id(2L)
                .build();
        Project project3 = new ProjectFixtureBuilder()
                .id(3L)
                .build();

        List<Project> projects = List.of(project1, project2, project3);

        ProjectCursor<?> cursor = CursorParser.toCursor(project2, ProjectSortType.CREATED_AT);

        Mockito.when(projectRepository.findWithSearchConditions(Mockito.any()))
                .thenReturn(projects);

        ProjectQueryCondition projectQueryCondition = new ProjectQueryCondition(
                null,
                null,
                null,
                ProjectSortType.CREATED_AT,
                3,
                null
        );

        Mockito.when(projectRepository.countWithSearchCondition(projectQueryCondition)).thenReturn(5L);

        ProjectSummaryResponse projectSummaryResponse1 = ProjectSummaryResponse.from(project1);
        ProjectSummaryResponse projectSummaryResponse2 = ProjectSummaryResponse.from(project2);
        ProjectSummaryResponse projectSummaryResponse3 = ProjectSummaryResponse.from(project3);

        // when
        PagedProjectResponse actual = projectService.getPagedProjects(projectQueryCondition);

        // then
        assertAll(
                () -> assertThat(actual.contents()).containsExactly(projectSummaryResponse1, projectSummaryResponse2,
                        projectSummaryResponse3),
                () -> assertThat(actual.hasNext()).isFalse(),
                () -> assertThat(actual.nextCursor()).isNull()
        );
    }

}
