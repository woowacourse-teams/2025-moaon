package moaon.backend.api.article;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.response.ValidatableResponse;
import io.restassured.specification.RequestSpecification;
import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleCategory;
import moaon.backend.article.dto.ArticleContent;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.restdocs.restassured.RestAssuredRestDocumentation;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import({RepositoryHelper.class, QueryDslConfig.class})
@ExtendWith(RestDocumentationExtension.class)
public class ArticleApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    private RepositoryHelper repositoryHelper;

    private RequestSpecification documentationSpecification;

    @BeforeEach
    void setUp(RestDocumentationContextProvider restDocumentation) {
        RestAssured.port = port;
        this.documentationSpecification = new RequestSpecBuilder()
                .addFilter(RestAssuredRestDocumentation.documentationConfiguration(restDocumentation)
                        .operationPreprocessors()
                        .withRequestDefaults(
                                Preprocessors.prettyPrint(),
                                Preprocessors.modifyUris()
                                        .scheme("https")
                                        .host("api.moaon.site")
                                        .removePort()
                        )
                        .withResponseDefaults(Preprocessors.prettyPrint()))
                .build();
    }

    @DisplayName("GET /articles : 페이징 방식의 프로젝트 조회 API")
    @Test
    void getPagedArticles() {
        // given
        ArticleCategory filteredArticleCategory = Fixture.anyArticleCategory();
        ArticleCategory unfilteredArticleCategory = Fixture.anyArticleCategory();

        TechStack filteredTechStack = Fixture.anyTechStack();
        TechStack unfilteredTechStack = Fixture.anyTechStack();

        String filteredSearch = "moa";
        String unfilteredSearch = "momo";

        Project project = repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(unfilteredSearch)
                        .category(filteredArticleCategory)
                        .techStacks(List.of(unfilteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(unfilteredSearch)
                        .category(unfilteredArticleCategory)
                        .techStacks(List.of(unfilteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(unfilteredSearch)
                        .category(unfilteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(unfilteredSearch)
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(6)
                        .build()
        );

        Article articleClickRankFirst = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(filteredSearch)
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(3)
                        .build()
        );

        Article articleClickRankSecond = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .title(filteredSearch)
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(2)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .title(unfilteredSearch)
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .summary(unfilteredSearch)
                        .category(filteredArticleCategory)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .build()
        );

        // when
        ArticleResponse actualResponse = RestAssured.given(documentationSpecification).log().all()
                .queryParams("sort", "clicks")
                .queryParams("search", filteredSearch)
                .queryParams("category", filteredArticleCategory.getName())
                .queryParams("techStacks", List.of(filteredTechStack.getName()))
                .queryParams("limit", 3)
                .queryParams("cursor", "5_6")
                .filter(RestAssuredRestDocumentation.document("{class-name}/{method-name}"))
                .when().get("/articles")
                .then().log().all()
                .statusCode(200)
                .extract().as(ArticleResponse.class);

        // then
        assertThat(actualResponse.articleContents()).extracting(ArticleContent::id)
                .containsExactly(articleClickRankFirst.getId(), articleClickRankSecond.getId());
    }

    @DisplayName("POST /articles/{id}/clicks : 아티클 클릭수 증가 API")
    @Test
    void updateArticleClicks() {
        // given
        Article article = repositoryHelper.save(new ArticleFixtureBuilder().build());

        // when 첫 클릭 - 기본 응답 + 클릭수 증가 + 쿠키 설정
        ValidatableResponse firstResponse = RestAssured.given(documentationSpecification).log().all()
                .pathParam("id", article.getId())
                .filter(RestAssuredRestDocumentation.document("{class-name}/{method-name}"))
                .when().post("/articles/{id}/clicks")
                .then().log().all()
                .statusCode(200);

        String cookie = firstResponse.extract().cookie("clicked_articles");
        // then 클릭수 및 쿠키 검증을 위해 서비스에서 직접 조회
        Article firstResult = repositoryHelper.getById(article.getId());
        assertAll("아티클 클릭수 증가 및 쿠키 설정 검증",
                () -> assertThat(firstResult.getClicks()).isEqualTo(1),
                () -> assertThat(cookie).isNotNull()
        );

        // when 쿠키와 함께 재클릭 - 클릭수 미증가 확인
        RestAssured.given().log().all()
                .cookie("clicked_articles", cookie)
                .pathParam("id", article.getId())
                .when().post("/articles/{id}/clicks")
                .then().log().all()
                .statusCode(200);
        Article secondResult = repositoryHelper.getById(article.getId());

        // then 클릭수 미증가 검증
        assertThat(secondResult.getClicks()).isEqualTo(1);
    }
}
