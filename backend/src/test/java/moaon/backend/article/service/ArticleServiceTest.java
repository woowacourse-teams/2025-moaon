package moaon.backend.article.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.repository.ArticleRepositoryFacade;
import moaon.backend.article.repository.db.ArticleContentRepository;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.parser.URLParser;
import moaon.backend.member.domain.Member;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.project.repository.ProjectRepository;
import moaon.backend.techStack.repository.TechStackRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class ArticleServiceTest {

    private final ArticleRepositoryFacade articleRepositoryFacade = Mockito.mock(ArticleRepositoryFacade.class);
    private final ArticleContentRepository articleContentRepository = Mockito.mock(ArticleContentRepository.class);
    private final ProjectRepository projectRepository = Mockito.mock(ProjectRepository.class);
    private final TechStackRepository techStackRepository = Mockito.mock(TechStackRepository.class);

    private final ArticleService articleService = new ArticleService(
            articleRepositoryFacade,
            articleContentRepository,
            projectRepository,
            techStackRepository
    );

    @DisplayName("존재하지 않는 프로젝트 ID로 검색하면 예외가 발생한다.")
    @Test
    void getByProjectId_notFound() {
        when(projectRepository.findById(123L)).thenReturn(Optional.empty());
        ProjectArticleQueryCondition condition = mock(ProjectArticleQueryCondition.class);

        assertThatThrownBy(() -> articleService.getByProjectId(123L, condition))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.PROJECT_NOT_FOUND);
    }

    @DisplayName("클릭 수를 증가시킨다.")
    @Test
    void increaseClicksCount_success() {
        Article article = new ArticleFixtureBuilder()
                .id(123L)
                .clicks(5)
                .build();

        when(articleRepositoryFacade.findById(123L)).thenReturn(Optional.of(article));
        when(articleRepositoryFacade.findById(123L)).thenReturn(Optional.of(article));

        articleService.increaseClicksCount(123L);

        assertThat(article.getClicks()).isEqualTo(6);
    }

    @DisplayName("존재하지 않는 아티클의 클릭 증가 시 예외 발생")
    @Test
    void increaseClicksCount_notFound() {
        when(articleRepositoryFacade.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> articleService.increaseClicksCount(1L))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.ARTICLE_NOT_FOUND);
    }


    @DisplayName("ArticleCreateRequest의 갯수만큼 저장한다.")
    @Test
    void save_createsArticleAndDocument() {
        // given
        Member author = new Member(1L, "socialId", "email", "name", 0);
        when(projectRepository.findById(1L)).thenReturn(
                Optional.of(new ProjectFixtureBuilder().author(author).build())
        );

        List<ArticleCreateRequest> articleCreateRequest = List.of(
                articleCreateRequestWithProjectId(1L),
                articleCreateRequestWithProjectId(1L),
                articleCreateRequestWithProjectId(1L)
        );

        // when
        articleService.save(articleCreateRequest, author);

        // then
        verify(articleRepositoryFacade, times(3)).save(any(Article.class));
    }

    @DisplayName("아티클 저장 시 로그인한 멤버가 프로젝트의 작성자가 아니면 예외 발생")
    @Test
    void save_unauthorizedMember() {
        // given
        when(projectRepository.findById(1L)).thenReturn(Optional.of(new ProjectFixtureBuilder()
                .author(new Member(1L, "socialId", "email", "name", 0)).build())
        );

        ArticleCreateRequest request = articleCreateRequestWithProjectId(1L);

        // when & then
        Member otherMember = Fixture.anyMember();
        assertThatThrownBy(() -> articleService.save(List.of(request), otherMember))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.UNAUTHORIZED_MEMBER);
    }

    private ArticleCreateRequest articleCreateRequestWithProjectId(long projectId) {
        return new ArticleCreateRequest(
                projectId,
                "title",
                "summary",
                List.of(),
                URLParser.parse("http://example.com"),
                "non_tech",
                List.of("design")
        );
    }
}
