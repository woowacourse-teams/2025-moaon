package moaon.backend.project.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

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
class ProjectRepositoryImplTest {

    @Autowired
    private ProjectRepositoryImpl projectRepositoryImpl;

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
        List<Project> projects = projectRepositoryImpl.findWithSearchConditions(projectQueryCondition);

        //then
        assertThat(projects.size()).isEqualTo(3);
    }

    @DisplayName("검색어로 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearch() {
        // given
        Project moaon = repositoryTestHelper.saveProjectWithFilterConditions(
                "모아온",
                "여러 플랫폼에 흩어진 포트폴리오를 한 곳에 정리할 수 있는 서비스입니다.",
                "GitHub, Notion, Velog 등 다양한 출처의 링크들을 카드 형태로 시각화하여 보여줍니다."
        );

        Project share = repositoryTestHelper.saveProjectWithFilterConditions(
                "공유공유",
                "개발자와 디자이너의 작업물을 쉽게 공유하고 검색할 수 있도록 도와줍니다.",
                "사용자 맞춤 검색 기능과 태그 필터링을 통해 필요한 작업물을 빠르게 찾을 수 있습니다."
        );

        Project hub = repositoryTestHelper.saveProjectWithFilterConditions(
                "허브허브",
                "링크 하나로 모든 프로젝트를 소개할 수 있는 포트폴리오 허브 플랫폼입니다.",
                "SNS 공유 최적화 및 모바일 반응형 UI를 제공하여 접근성과 확장성을 높였습니다."
        );

        // when
        List<Project> projects1 = projectRepositoryImpl.findWithSearchConditions(new ProjectQueryCondition("모아온"));
        List<Project> projects2 = projectRepositoryImpl.findWithSearchConditions(new ProjectQueryCondition("개발자"));
        List<Project> projects3 = projectRepositoryImpl.findWithSearchConditions(new ProjectQueryCondition("SNS"));

        // then
        assertAll(
                () -> assertThat(projects1).containsOnly(moaon),
                () -> assertThat(projects2).containsOnly(share),
                () -> assertThat(projects3).containsOnly(hub)
        );
    }
}
