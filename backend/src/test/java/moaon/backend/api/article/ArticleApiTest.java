package moaon.backend.api.article;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ValidatableResponse;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import moaon.backend.api.BaseApiTest;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleContent;
import moaon.backend.article.dto.ArticleCreateRequest;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.domain.Project;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;

@Import({RepositoryHelper.class, QueryDslConfig.class})
public class ArticleApiTest extends BaseApiTest {

    @Autowired
    protected RepositoryHelper repositoryHelper;

    @DisplayName("POST /articles: 아티클 저장 API")
    @Test
    void save() throws MalformedURLException {
        // given
        Project savedProject = repositoryHelper.save(
                new ProjectFixtureBuilder().build()
        );

        ArticleCreateRequest articleCreateRequest = ArticleCreateRequest.builder()
                .projectId(savedProject.getId())
                .projectTitle(savedProject.getTitle())
                .title("fork-ts-checker-webpack-plugin")
                .summary("webpack-plugin 도입")
                .techStacks(List.of("react"))
                .url(
                        new URL("https://tattered-drive-af3.notion.site/fork-ts-checker-webpack-plugin-2514b5223064806e96cceac24ff9dafd")
                )
                .sector("fe")
                .topics(List.of("etc"))
                .build();

        // when
        RestAssured.given(documentationSpecification).log().all()
                .contentType(ContentType.JSON)
                .body(List.of(articleCreateRequest))
                .filter(document(articleCreateRequestFields()))
                .when().post("/articles")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("GET /articles : 페이징 방식의 아티클 조회 API")
    @Test
    void getPagedArticles() {
        // given
        Sector filteredSector = Sector.BE;
        Sector unfilteredSector = Sector.FE;
        Topic filteredTopic = Topic.DATABASE;
        Topic unfilteredTopic = Topic.API_DESIGN;
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
                        .sector(unfilteredSector)
                        .content(filteredSearch)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(4)
                        .topics(filteredTopic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .techStacks(List.of(unfilteredTechStack))
                        .content(filteredSearch)
                        .sector(filteredSector)
                        .project(project)
                        .clicks(4)
                        .topics(filteredTopic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .title(unfilteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .topics(filteredTopic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .summary(unfilteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .topics(filteredTopic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(unfilteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(unfilteredTechStack))
                        .project(project)
                        .clicks(4)
                        .topics(filteredTopic)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .topics(unfilteredTopic)
                        .content(filteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(4)
                        .build()
        );
        Article articleClickRankThird = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(filteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(1)
                        .topics(filteredTopic)
                        .build()
        );
        Article articleClickRankSecond = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .title(filteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(2)
                        .topics(filteredTopic)
                        .build()
        );
        Article articleClickRankFirst = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .content(filteredSearch)
                        .sector(filteredSector)
                        .techStacks(List.of(filteredTechStack))
                        .project(project)
                        .clicks(3)
                        .topics(filteredTopic)
                        .build()
        );

        // when
        ArticleResponse actualResponse = RestAssured.given(documentationSpecification).log().all()
                .queryParams("sort", "clicks")
                .queryParams("search", filteredSearch)
                .queryParams("sector", filteredSector.getName())
                .queryParams("topics", List.of(filteredTopic.getName()))
                .queryParams("techStacks", List.of(filteredTechStack.getName()))
                .queryParams("limit", 2)
                .queryParams("cursor", "5_6")
                .filter(document(articleQueryParameters(), articleResponseFields()))
                .when().get("/articles")
                .then().log().all()
                .statusCode(200)
                .extract().as(ArticleResponse.class);

        // then
        assertThat(actualResponse.contents())
                .extracting(ArticleContent::id)
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
                .filter(document())
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

    private RequestFieldsSnippet articleCreateRequestFields() {
        return requestFields(
                fieldWithPath("[].projectId").description("프로젝트 ID"),
                fieldWithPath("[].projectTitle").description("프로젝트 제목"),
                fieldWithPath("[].title").description("아티클 제목"),
                fieldWithPath("[].summary").description("아티클 요약"),
                fieldWithPath("[].techStacks").description("기술 스택 목록"),
                fieldWithPath("[].url").description("아티클 URL"),
                fieldWithPath("[].sector").description("직군"),
                fieldWithPath("[].topics").description("아티클 주제")
        );
    }

    private static QueryParametersSnippet articleQueryParameters() {
        return queryParameters(
                parameterWithName("sort").description("정렬 기준 (clicks, createdAt)").optional(),
                parameterWithName("search").description("검색어").optional(),
                parameterWithName("sector").description("직군").optional(),
                parameterWithName("topics").description("아티클 주제").optional(),
                parameterWithName("techStacks").description("기술 스택 목록").optional(),
                parameterWithName("limit").description("요청 데이터 개수 | Max: 100"),
                parameterWithName("cursor").description("이전 요청의 마지막 데이터 식별자 (정렬기준_id)").optional()
        );
    }

    private static ResponseFieldsSnippet articleResponseFields() {
        return responseFields(
                fieldWithPath("contents").description("아티클 목록"),
                fieldWithPath("contents[].id").description("아티클 ID"),
                fieldWithPath("contents[].projectId").description("프로젝트 ID"),
                fieldWithPath("contents[].projectTitle").description("프로젝트 제목"),
                fieldWithPath("contents[].clicks").description("클릭수"),
                fieldWithPath("contents[].title").description("아티클 제목"),
                fieldWithPath("contents[].summary").description("아티클 요약"),
                fieldWithPath("contents[].techStacks").description("기술 스택 목록"),
                fieldWithPath("contents[].url").description("아티클 URL"),
                fieldWithPath("contents[].sector").description("직군"),
                fieldWithPath("contents[].topics").description("아티클 주제"),
                fieldWithPath("contents[].createdAt").description("생성일시"),
                fieldWithPath("totalCount").description("필터링 걸린 데이터의 전체 개수"),
                fieldWithPath("hasNext").description("다음 페이지 존재 여부"),
                fieldWithPath("nextCursor").description("다음 요청 커서")
        );
    }
}
