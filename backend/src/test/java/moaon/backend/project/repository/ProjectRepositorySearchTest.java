package moaon.backend.project.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.ProjectQueryConditionFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@SpringBootTest
@Import(RepositoryHelper.class)
public class ProjectRepositorySearchTest extends MySQLContainerTest {

    @Autowired
    private CustomizedProjectRepositoryImpl repository;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @DisplayName("검색어로 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearch() {
        // given
        Project moaon = repositoryHelper.save(new ProjectFixtureBuilder()
            .title("모아온")
            .summary("여러 플랫폼에 흩어진 포트폴리오를 한 곳에 정리할 수 있는 서비스입니다.")
            .description("GitHub, Notion, Velog 등 다양한 출처의 링크들을 카드 형태로 시각화하여 보여줍니다.")
            .build()
        );
        Project share = repositoryHelper.save(new ProjectFixtureBuilder()
            .title("공유공유")
            .summary("개발자와 디자이너의 작업물을 쉽게 공유하고 검색할 수 있도록 도와줍니다.")
            .description("사용자 맞춤 검색 기능과 태그 필터링을 통해 필요한 작업물을 빠르게 찾을 수 있습니다.")
            .build()
        );
        Project hub = repositoryHelper.save(new ProjectFixtureBuilder()
            .title("허브허브")
            .summary("링크 하나로 모든 프로젝트를 소개할 수 있는 포트폴리오 허브 플랫폼입니다.")
            .description("SNS 공유 최적화 및 모바일 반응형 UI를 제공하여 접근성과 확장성을 높였습니다.")
            .build()
        );

        // when
        List<Project> aboutMoaon = repository.findWithSearchConditions(aboutSearchKeyword("모아"));
        List<Project> aboutShare = repository.findWithSearchConditions(aboutSearchKeyword("공유"));
        List<Project> resultAboutHub = repository.findWithSearchConditions(
            aboutSearchKeyword("허브"));

        // then
        assertAll(
            () -> assertThat(aboutMoaon).containsOnlyOnce(moaon),
            () -> assertThat(aboutShare).containsOnlyOnce(share),
            () -> assertThat(resultAboutHub).containsOnlyOnce(hub)
        );
    }

    private ProjectQueryCondition aboutSearchKeyword(String keyword) {
        return new ProjectQueryConditionFixtureBuilder()
            .search(keyword)
            .build();
    }
}
