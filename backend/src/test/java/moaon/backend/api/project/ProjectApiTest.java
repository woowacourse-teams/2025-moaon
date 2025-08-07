package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;

import io.restassured.RestAssured;
import io.restassured.response.ValidatableResponse;
import java.util.List;
import moaon.backend.api.BaseApiTest;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;

public class ProjectApiTest extends BaseApiTest {

    @DisplayName("GET /projects/{id} : 프로젝트 단건 조회 API")
    @Test
    void getProjectById() {
        // given
        Project project = repositoryHelper.save(new ProjectFixtureBuilder().build());

        // when & then 첫 조회 - 기본 응답 + 조회수 증가 + 쿠키 설정
        ValidatableResponse firstResponse = RestAssured.given(documentationSpecification).log().all()
                .pathParam("id", project.getId())
                .filter(document(projectDetailResponseFields()))
                .when().get("/projects/{id}")
                .then().log().all()
                .statusCode(200);

        ProjectDetailResponse firstResult = firstResponse.extract().as(ProjectDetailResponse.class);
        String cookie = firstResponse.extract().cookie("viewed_projects");

        // then 기본 응답 검증
        assertAll("프로젝트 기본 정보 및 첫 조회 검증",
                () -> assertThat(firstResult.title()).isEqualTo(project.getTitle()),
                () -> assertThat(firstResult.summary()).isEqualTo(project.getSummary()),
                () -> assertThat(firstResult.description()).isEqualTo(project.getDescription()),
                () -> assertThat(firstResult.techStacks())
                        .isEqualTo(project.getTechStacks().stream().map(TechStack::getName).toList()),
                () -> assertThat(firstResult.loves()).isEqualTo(0),
                () -> assertThat(firstResult.views()).isEqualTo(1), // 조회수 증가
                () -> assertThat(cookie).isNotNull() // 쿠키 설정
        );

        // when & then 쿠키와 함께 재조회 - 조회수 미증가 확인
        ProjectDetailResponse secondResult = RestAssured.given().log().all()
                .cookie("viewed_projects", cookie)
                .pathParam("id", project.getId())
                .when().get("/projects/{id}")
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectDetailResponse.class);

        // then 쿠키 동작 검증
        assertThat(secondResult.views()).isEqualTo(1); // 조회수 미증가
    }

    @DisplayName("GET /projects : 모든 프로젝트 조회 API")
    @Test
    void getPagedProjects() {
        // given
        String filteredSearch = "moaon";
        String unfilteredSearch = "momoon";
        ProjectCategory filteredProjectCategory = Fixture.anyProjectCategory();
        ProjectCategory unfilteredProjectCategory = Fixture.anyProjectCategory();
        TechStack filteredTechStack = Fixture.anyTechStack();
        TechStack unfilteredTechStack = Fixture.anyTechStack();

        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(unfilteredSearch)
                        .categories(filteredProjectCategory)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .categories(unfilteredProjectCategory)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .categories(filteredProjectCategory)
                        .techStacks(unfilteredTechStack)
                        .build()
        );

        Project projectViewRankThird = repositoryHelper.save(new ProjectFixtureBuilder()
                .description(filteredSearch)
                .categories(filteredProjectCategory)
                .techStacks(filteredTechStack)
                .views(1)
                .build()
        );
        Project projectViewRankSecond = repositoryHelper.save(new ProjectFixtureBuilder()
                .summary(filteredSearch)
                .categories(filteredProjectCategory)
                .techStacks(filteredTechStack)
                .views(2)
                .build()
        );
        Project projectViewRankFirst = repositoryHelper.save(new ProjectFixtureBuilder()
                .title(filteredSearch)
                .categories(filteredProjectCategory)
                .techStacks(filteredTechStack)
                .views(3)
                .build()
        );

        // when
        PagedProjectResponse actualResponses = RestAssured.given(documentationSpecification).log().all()
                .queryParams("search", filteredSearch)
                .queryParams("sort", "views")
                .queryParams("categories", List.of(filteredProjectCategory.getName()))
                .queryParams("techStacks", List.of(filteredTechStack.getName()))
                .queryParams("limit", 2)
                .filter(document(projectQueryParameters(), pagedProjectResponseFields()))
                .when().get("/projects")
                .then().log().all()
                .statusCode(200)
                .extract().as(PagedProjectResponse.class);

        // then
        assertAll(
                () -> assertThat(actualResponses.contents()).hasSize(2),
                () -> assertThat(actualResponses.contents().get(0).id()).isEqualTo(projectViewRankFirst.getId()),
                () -> assertThat(actualResponses.contents().get(1).id()).isEqualTo(projectViewRankSecond.getId())
        );
    }

    @DisplayName("GET /projects/{id}/articles : 특정 프로젝트 ID에 있는 모든 아티클 조회 API")
    @Test
    void getArticlesByProjectId() {
        // given
        Project targetProject = new ProjectFixtureBuilder().build();

        Article targetProjectArticle1 = repositoryHelper.save(
                new ArticleFixtureBuilder().project(targetProject).build()
        );
        Article targetProjectArticle2 = repositoryHelper.save(
                new ArticleFixtureBuilder().project(targetProject).build()
        );
        Article targetProjectArticle3 = repositoryHelper.save(
                new ArticleFixtureBuilder().project(targetProject).build()
        );

        repositoryHelper.save(new ArticleFixtureBuilder().build());

        // when
        ArticleDetailResponse[] actualArticles = RestAssured.given(documentationSpecification).log().all()
                .filter(document(projectArticlesResponseFields()))
                .when().get("/projects/{id}/articles", targetProject.getId())
                .then().log().all()
                .statusCode(200)
                .extract().as(ArticleDetailResponse[].class);

        // then
        assertThat(actualArticles)
                .extracting(ArticleDetailResponse::id)
                .containsExactlyInAnyOrder(
                        targetProjectArticle1.getId(),
                        targetProjectArticle2.getId(),
                        targetProjectArticle3.getId()
                );
    }

    private ResponseFieldsSnippet projectDetailResponseFields() {
        return responseFields(
                fieldWithPath("id").description("프로젝트 ID"),
                fieldWithPath("authorId").description("작성자 ID"),
                fieldWithPath("title").description("프로젝트 제목"),
                fieldWithPath("summary").description("프로젝트 요약"),
                fieldWithPath("description").description("프로젝트 상세 설명"),
                fieldWithPath("techStacks").description("사용된 기술 스택 목록"),
                fieldWithPath("categories").description("프로젝트 카테고리 목록"),
                fieldWithPath("imageUrls").description("프로젝트 이미지 URL 목록").optional(),
                fieldWithPath("isLoved").description("현재 사용자의 좋아요 여부"),
                fieldWithPath("loves").description("좋아요 수"),
                fieldWithPath("views").description("조회수"),
                fieldWithPath("createdAt").description("생성일시"),
                fieldWithPath("githubUrl").description("GitHub 저장소 URL").optional(),
                fieldWithPath("productionUrl").description("배포 URL").optional()
        );
    }

    private ResponseFieldsSnippet pagedProjectResponseFields() {
        return responseFields(
                fieldWithPath("contents").description("프로젝트 목록"),
                fieldWithPath("contents[].id").description("프로젝트 ID"),
                fieldWithPath("contents[].title").description("프로젝트 제목"),
                fieldWithPath("contents[].summary").description("프로젝트 소개"),
                fieldWithPath("contents[].techStacks").description("기술 스택 목록"),
                fieldWithPath("contents[].thumbnailUrl").description("썸네일 이미지 URL").optional(),
                fieldWithPath("contents[].isLoved").description("현재 사용자의 좋아요 여부"),
                fieldWithPath("contents[].loves").description("좋아요 수"),
                fieldWithPath("contents[].views").description("조회수"),
                fieldWithPath("totalCount").description("필터링 걸린 데이터의 전체 개수"),
                fieldWithPath("hasNext").description("다음 페이지 존재 여부"),
                fieldWithPath("nextCursor").description("다음 요청 커서")
        );
    }

    private QueryParametersSnippet projectQueryParameters() {
        return queryParameters(
                parameterWithName("search").description("검색어").optional(),
                parameterWithName("sort").description("정렬 기준 (views, loves, createdAt)").optional(),
                parameterWithName("categories").description("카테고리 목록").optional(),
                parameterWithName("techStacks").description("기술 스택 목록").optional(),
                parameterWithName("limit").description("요청 데이터 개수"),
                parameterWithName("cursor").description("이전 요청의 마지막 데이터 식별자 (정렬기준_id)").optional()
        );
    }

    private ResponseFieldsSnippet projectArticlesResponseFields() {
        return responseFields(
                fieldWithPath("[].id").description("아티클 ID"),
                fieldWithPath("[].title").description("아티클 제목"),
                fieldWithPath("[].summary").description("아티클 요약"),
                fieldWithPath("[].techStacks").description("기술 스택 목록").optional(),
                fieldWithPath("[].articleUrl").description("아티클 URL"),
                fieldWithPath("[].category").description("아티클 카테고리"),
                fieldWithPath("[].createdAt").description("생성일시")
        );
    }
}
