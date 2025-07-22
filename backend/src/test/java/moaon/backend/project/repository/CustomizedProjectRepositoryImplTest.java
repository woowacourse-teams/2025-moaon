package moaon.backend.project.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import moaon.backend.fixture.RepositoryTestHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.member.domain.Member;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.SortBy;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({RepositoryTestHelper.class, QueryDslConfig.class})
class CustomizedProjectRepositoryImplTest {

    @Autowired
    private CustomizedProjectRepositoryImpl customizedProjectRepositoryImpl;

    @Autowired
    private RepositoryTestHelper repositoryTestHelper;

    @DisplayName("조건 없이 모든 프로젝트를 조회한다.")
    @Test
    void findWithSearchConditions() {
        // given
        repositoryTestHelper.saveAnyProject();
        repositoryTestHelper.saveAnyProject();
        repositoryTestHelper.saveAnyProject();

        ProjectQueryCondition projectQueryCondition = new ProjectQueryCondition(null, null);

        //when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(projectQueryCondition);

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
        List<Project> projects1 = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition("모아온", null));
        List<Project> projects2 = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition("개발자", null));
        List<Project> projects3 = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition("SNS", null));

        // then
        assertAll(
                () -> assertThat(projects1).containsOnly(moaon),
                () -> assertThat(projects2).containsOnly(share),
                () -> assertThat(projects3).containsOnly(hub)
        );
    }

    @DisplayName("프로젝트를 조회순을 기준으로 정렬한다.")
    @Test
    void toOrderByViews() {
        // given
        Project project1 = repositoryTestHelper.saveAnyProject();
        Project project2 = repositoryTestHelper.saveAnyProject();
        Project project3 = repositoryTestHelper.saveAnyProject();

        project1.addViewCount();
        project1.addViewCount();
        project1.addViewCount();

        project2.addViewCount();
        project2.addViewCount();

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(null, SortBy.VIEWS)
        );

        // then
        assertThat(projects).containsSequence(project1, project2, project3);
    }

    @DisplayName("프로젝트를 생성일자 기준으로 정렬한다.")
    @Test
    void toOrderByCreatedAt() {
        // given
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime tomorrow = today.plusDays(1);
        LocalDateTime yesterday = today.minusDays(1);
        Project todayProject = repositoryTestHelper.saveProjectWithCreatedAt(today);
        Project tomorrowProject = repositoryTestHelper.saveProjectWithCreatedAt(tomorrow);
        Project yesterdayProject = repositoryTestHelper.saveProjectWithCreatedAt(yesterday);

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(null, SortBy.CREATED_AT)
        );

        // then
        assertThat(projects).containsSequence(tomorrowProject, todayProject, yesterdayProject);
    }

    @DisplayName("프로젝트를 좋아요 순으로 정렬한다.")
    @Test
    void toOrderByLove() {
        // given
        Project low = repositoryTestHelper.saveAnyProject();
        Project middle = repositoryTestHelper.saveAnyProject();
        Project high = repositoryTestHelper.saveAnyProject();

        Member author1 = low.getAuthor();
        Member author2 = middle.getAuthor();

        high.addLovedMember(author1);
        high.addLovedMember(author2);

        middle.addLovedMember(author1);

        // when
        List<Project> projects = customizedProjectRepositoryImpl.findWithSearchConditions(
                new ProjectQueryCondition(null, SortBy.LOVES)
        );

        // then
        assertThat(projects).containsSequence(high, middle, low);
    }
}
