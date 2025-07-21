package moaon.backend.project.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import moaon.backend.fixture.RepositoryTestHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.domain.Project;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({RepositoryTestHelper.class, QueryDslConfig.class})
class ProjectQueryDslFinderTest {

    @Autowired
    private ProjectRepositoryImpl projectQueryDslFinder;

    @Autowired
    private RepositoryTestHelper repositoryTestHelper;

    @DisplayName("조건 없이 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearchConditions() {
        // given
        repositoryTestHelper.saveAnyProject();
        repositoryTestHelper.saveAnyProject();
        repositoryTestHelper.saveAnyProject();

        ProjectQueryCondition projectQueryCondition = new ProjectQueryCondition(null);

        //when
        List<Project> projects = projectQueryDslFinder.findWithSearchConditions(projectQueryCondition);

        //then
        assertThat(projects.size()).isEqualTo(3);
    }
}
