package moaon.backend.project.service;


import static org.assertj.core.api.Assertions.assertThatThrownBy;

import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.exception.custom.NotFoundException;
import moaon.backend.project.repository.ProjectRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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
                .isInstanceOf(NotFoundException.class)
                .hasMessage(ErrorCode.PROJECT_NOT_FOUND.getMessage());
    }
}
