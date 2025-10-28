package moaon.backend.project.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import moaon.backend.article.domain.Sector;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ProjectTest {

    private final Member author = Fixture.anyMember();
    private final Images images = new Images(List.of("url"));
    private final List<TechStack> techStacks = List.of(new TechStack("Spring"));
    private final List<Category> categories = List.of(new Category("Web"));
    private final LocalDateTime now = LocalDateTime.now();

    @DisplayName("유효한 값이면 정상적으로 Project가 생성된다.")
    @Test
    void validProject_isCreatedSuccessfully() {
        Project project = new Project(
                "모아온",
                "모아온은 개발자 포트폴리오 플랫폼입니다.",
                "개발자들이 프로젝트와 기술 아티클을 한곳에 모아 보여주는 플랫폼입니다. 상세 설명은 충분히 길게 작성되어야 합니다.".repeat(10),
                "https://github.com/moaon",
                "https://moaon.site",
                images,
                author,
                techStacks,
                categories,
                now
        );

        assertThat(project).isNotNull();
        assertThat(project.getTitle()).isEqualTo("모아온");
    }

    @DisplayName("제목이 너무 짧으면 예외 발생")
    @Test
    void invalidTitle_throwsException() {
        assertThatThrownBy(() -> new Project(
                "A", // too short
                "적절한 요약입니다.".repeat(2),
                "길이가 충분히 길어야 합니다.",
                "", "", images, author, techStacks, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_TITLE);
    }

    @DisplayName("제목에 허용되지 않은 문자 포함 시 예외 발생")
    @Test
    void invalidTitle_invalidchar_throwsException() {
        assertThatThrownBy(() -> new Project(
                "😈", // invalid char
                "요약이 충분히 깁니다.".repeat(2),
                "내용".repeat(100),
                "", "", images, author, techStacks, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_TITLE);
    }

    @DisplayName("요약(summary)이 10자 미만이면 예외 발생")
    @Test
    void invalidSummary_short_throwsException() {
        assertThatThrownBy(() -> new Project(
                "모아온",
                "짧음",
                "내용".repeat(100),
                "", "", images, author, techStacks, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_SUMMARY);
    }

    @DisplayName("요약(summary)이 50자 초과면 예외 발생")
    @Test
    void invalidSummary_long_throwsException() {
        assertThatThrownBy(() -> new Project(
                "모아온",
                "긺".repeat(51),
                "내용".repeat(100),
                "", "", images, author, techStacks, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_SUMMARY);
    }

    @DisplayName("설명이 100자 미만이면 예외 발생")
    @Test
    void invalidDescription_short_throwsException() {
        assertThatThrownBy(() -> new Project(
                "모아온",
                "적절한 요약입니다.".repeat(2),
                "짧음",
                "", "", images, author, techStacks, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_DESCRIPTION);
    }

    @DisplayName("설명이 8000자 초과면 예외 발생")
    @Test
    void invalidDescription_long_throwsException() {
        assertThatThrownBy(() -> new Project(
                "모아온",
                "적절한 요약입니다.".repeat(2),
                "긺".repeat(8001),
                "", "", images, author, techStacks, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_DESCRIPTION);
    }

    @DisplayName("기술 스택이 비어있으면 예외 발생")
    @Test
    void invalidTechStacks_throwsException() {
        // 빈 리스트
        List<TechStack> techStacks = new ArrayList<>();
        assertThatThrownBy(() -> new Project(
                "모아온",
                "적절한 요약입니다.".repeat(2),
                "내용".repeat(100),
                "", "", images, author, techStacks, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_TECHSTACK);
    }

    @DisplayName("기술 스택이 중복되면 예외 발생")
    @Test
    void invalidTechStacks_duplicated_throwsException() {
        // 중복
        List<TechStack> duplicated = List.of(new TechStack("spring"), new TechStack("spring"));
        assertThatThrownBy(() -> new Project(
                "모아온",
                "적절한 요약입니다.".repeat(2),
                "내용".repeat(100),
                "", "", images, author, duplicated, categories, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_TECHSTACK);
    }

    @DisplayName("카테고리가 비어있으면 예외 발생")
    @Test
    void invalidCategories_empty_throwsException() {
        // 빈 리스트
        assertThatThrownBy(() -> new Project(
                "모아온",
                "요약 충분".repeat(5),
                "내용".repeat(100),
                "", "", images, author, techStacks, List.of(), now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_CATEGORY);
    }

    @DisplayName("카테고리가 중복되면 예외 발생")
    @Test
    void invalidCategories_duplicate_throwsException() {
        // 중복
        List<Category> duplicated = List.of(new Category("web"), new Category("web"));
        assertThatThrownBy(() -> new Project(
                "모아온",
                "요약 충분".repeat(5),
                "내용".repeat(100),
                "", "", images, author, techStacks, duplicated, now
        ))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_INVALID_CATEGORY);
    }

    @DisplayName("아티클들을 ID 목록으로 얻는다.")
    @Test
    void getArticleIds() {
        Project project = Project.builder()
                .articles(List.of(
                        new ArticleFixtureBuilder().id(1L).build(),
                        new ArticleFixtureBuilder().id(2L).build(),
                        new ArticleFixtureBuilder().id(3L).build()
                )).build();

        assertThat(project.getArticleIds())
                .containsExactly(1L, 2L, 3L);
    }

    @DisplayName("아티클들을 섹터별로 그룹화하여 개수를 센다.")
    @Test
    void countArticlesGroupBySector_groupsCorrectly() {
        // given
        Project project = Project.builder()
                .articles(List.of(
                        new ArticleFixtureBuilder().sector(Sector.BE).build(),
                        new ArticleFixtureBuilder().sector(Sector.BE).build(),
                        new ArticleFixtureBuilder().sector(Sector.FE).build())
                ).build();

        // when
        Map<Sector, Long> result = project.countArticlesGroupBySector();

        // then
        assertThat(result)
                .containsEntry(Sector.BE, 2L)
                .containsEntry(Sector.FE, 1L);
    }

    @DisplayName("아티클이 없는 섹터도 0으로 채운다.")
    @Test
    void countArticlesGroupBySector_fillsZeros() {
        // given
        Project project = Project.builder()
                .articles(List.of(
                        new ArticleFixtureBuilder().sector(Sector.BE).build()
                )).build();

        // when
        Map<Sector, Long> result = project.countArticlesGroupBySector();

        // then
        assertThat(result)
                .containsEntry(Sector.BE, 1L)
                .containsEntry(Sector.FE, 0L)
                .containsEntry(Sector.IOS, 0L)
                .containsEntry(Sector.ANDROID, 0L)
                .containsEntry(Sector.NON_TECH, 0L)
                .containsEntry(Sector.INFRA, 0L);
    }
}
