package moaon.backend.article.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.BDDMockito.given;

import java.util.List;
import java.util.Optional;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.dto.ArticleContent;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.global.cursor.ArticleCursor;
import moaon.backend.global.cursor.CursorParser;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import moaon.backend.project.repository.ProjectRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ArticleService articleService;

    @DisplayName("다음 아티클이 존재할 때 nextCursor를 포함하여 아티클을 리턴한다.")
    @Test
    void getPagedArticlesWhenHasNext() {
        // given
        Project project = new ProjectFixtureBuilder().build();
        Article article1 = new ArticleFixtureBuilder()
                .id(1L)
                .project(project)
                .build();
        Article article2 = new ArticleFixtureBuilder()
                .id(2L)
                .project(project)
                .build();
        Article article3 = new ArticleFixtureBuilder()
                .id(3L)
                .project(project)
                .build();
        List<Article> articles = List.of(article1, article2, article3);

        ArticleCursor<?> articleCursor = CursorParser.toCursor(article2, ArticleSortType.CREATED_AT);

        Mockito.when(articleRepository.findWithSearchConditions(Mockito.any()))
                .thenReturn(articles);

        ArticleQueryCondition articleQueryCondition = new ArticleQueryCondition(
                null,
                null,
                null,
                ArticleSortType.CREATED_AT,
                2,
                null
        );

        Mockito.when(articleRepository.countWithSearchCondition(articleQueryCondition)).thenReturn(5L);

        ArticleContent articleContent1 = ArticleContent.from(article1);
        ArticleContent articleContent2 = ArticleContent.from(article2);

        // when
        ArticleResponse actual = articleService.getPagedArticles(articleQueryCondition);

        // then
        assertAll(
                () -> assertThat(actual.articleContents()).containsExactly(articleContent1, articleContent2),
                () -> assertThat(actual.totalCount()).isEqualTo(5),
                () -> assertThat(actual.hasNext()).isTrue(),
                () -> assertThat(actual.nextCursor()).isEqualTo(articleCursor.getNextCursor())
        );
    }

    @DisplayName("다음 아티클이 존재하지 않다면 nextCursor 에 공백을 넣고 리턴한다.")
    @Test
    void getPagedArticlesWhenHasNoNext() {
        // given
        Project project = new ProjectFixtureBuilder().build();
        Article article1 = new ArticleFixtureBuilder()
                .id(1L)
                .project(project)
                .build();
        Article article2 = new ArticleFixtureBuilder()
                .id(2L)
                .project(project)
                .build();
        Article article3 = new ArticleFixtureBuilder()
                .id(3L)
                .project(project)
                .build();
        List<Article> articles = List.of(article1, article2, article3);

        Mockito.when(articleRepository.findWithSearchConditions(Mockito.any()))
                .thenReturn(articles);

        ArticleQueryCondition articleQueryCondition = new ArticleQueryCondition(
                null,
                null,
                null,
                ArticleSortType.CREATED_AT,
                3,
                null
        );

        Mockito.when(articleRepository.countWithSearchCondition(articleQueryCondition)).thenReturn(5L);

        ArticleContent articleContent1 = ArticleContent.from(article1);
        ArticleContent articleContent2 = ArticleContent.from(article2);
        ArticleContent articleContent3 = ArticleContent.from(article3);

        // when
        ArticleResponse actual = articleService.getPagedArticles(articleQueryCondition);

        // then
        assertAll(
                () -> assertThat(actual.articleContents()).containsExactly(articleContent1, articleContent2,
                        articleContent3),
                () -> assertThat(actual.hasNext()).isFalse(),
                () -> assertThat(actual.nextCursor()).isNull()
        );
    }

    @DisplayName("프로젝트가 존재하지 않다면 예외가 발생한다.")
    @Test
    void getByProjectId() {
        // Given
        long projectId = 1L;
        given(projectRepository.findById(projectId)).willReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> articleService.getByProjectId(projectId))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.PROJECT_NOT_FOUND.getMessage());
    }
}
