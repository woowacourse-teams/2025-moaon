package moaon.backend.api.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ValidatableResponse;
import java.util.List;
import moaon.backend.api.BaseApiTest;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleDetailResponse;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleSectorCount;
import moaon.backend.article.repository.db.DBArticleSearchResult;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import moaon.backend.member.service.JwtTokenService;
import moaon.backend.member.service.MemberService;
import moaon.backend.project.domain.Category;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.PagedProjectResponse;
import moaon.backend.project.dto.ProjectArticleResponse;
import moaon.backend.project.dto.ProjectCreateRequest;
import moaon.backend.project.dto.ProjectCreateResponse;
import moaon.backend.project.dto.ProjectDetailResponse;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@Import({RepositoryHelper.class, QueryDslConfig.class})
public class ProjectApiTest extends BaseApiTest {

    @Autowired
    protected RepositoryHelper repositoryHelper;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private MemberRepository memberRepository;

    @MockitoBean
    private MemberService memberService;

    @MockitoBean
    private ArticleDocumentRepository articleDocumentRepository;

    private String token;

    @BeforeEach
    void cookieSetUp() {
        Member member = Fixture.anyMember();
        repositoryHelper.save(member);

        token = jwtTokenService.createToken(member.getId());
    }


    @DisplayName("POST /projects : 프로젝트 저장 API")
    @Test
    void saveProject() {
        // given
        repositoryHelper.save(new TechStack("java"));
        repositoryHelper.save(new TechStack("mysql"));
        repositoryHelper.save(new TechStack("docker"));

        repositoryHelper.save(new Category("web"));
        repositoryHelper.save(new Category("it"));

        Member member = repositoryHelper.save(new Member("123", "popo@gmail.com", "포포"));

        ProjectCreateRequest projectCreateRequest = ProjectCreateRequest.builder()
                .title("모아온")
                .summary("프로젝트를 모아모아, 모아온")
                .description(
                        """
                                이제 모아온에서 나의 성장을 위한 프로젝트를 발견하세요.
                                이제 모아온에서 나의 성장을 위한 프로젝트를 발견하세요.
                                이제 모아온에서 나의 성장을 위한 프로젝트를 발견하세요.
                                이제 모아온에서 나의 성장을 위한 프로젝트를 발견하세요.
                                이제 모아온에서 나의 성장을 위한 프로젝트를 발견하세요.
                                """
                )
                .techStacks(List.of("java", "mysql", "docker"))
                .categories(List.of("web", "it"))
                .githubUrl("www.moaon.github")
                .productionUrl("www.moaon.co.kr")
                .imageKeys(List.of("www.images.com"))
                .build();

        when(memberService.getUserByToken(any())).thenReturn(member);

        // when
        ProjectCreateResponse response = RestAssured.given(documentationSpecification).log().all()
                .contentType(ContentType.JSON)
                .cookie("token", token)
                .body(projectCreateRequest)
                .filter(document(projectCreateRequestFields(), projectCreateResponseFields()))
                .when().post("/projects")
                .then().log().all()
                .statusCode(201)
                .extract().as(ProjectCreateResponse.class);

        // then
        assertThat(response.id()).isNotNull();
    }

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
        Category filteredCategory = Fixture.anyProjectCategory();
        Category unfilteredCategory = Fixture.anyProjectCategory();
        TechStack filteredTechStack = Fixture.anyTechStack();
        TechStack unfilteredTechStack = Fixture.anyTechStack();

        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(unfilteredSearch)
                        .categories(filteredCategory)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .categories(unfilteredCategory)
                        .techStacks(filteredTechStack)
                        .build()
        );
        repositoryHelper.save(
                new ProjectFixtureBuilder()
                        .description(filteredSearch)
                        .categories(filteredCategory)
                        .techStacks(unfilteredTechStack)
                        .build()
        );

        Project projectViewRankThird = repositoryHelper.save(new ProjectFixtureBuilder()
                .description(filteredSearch)
                .categories(filteredCategory)
                .techStacks(filteredTechStack)
                .views(1)
                .build()
        );
        Project projectViewRankSecond = repositoryHelper.save(new ProjectFixtureBuilder()
                .summary(filteredSearch)
                .categories(filteredCategory)
                .techStacks(filteredTechStack)
                .views(2)
                .build()
        );
        Project projectViewRankFirst = repositoryHelper.save(new ProjectFixtureBuilder()
                .title(filteredSearch)
                .categories(filteredCategory)
                .techStacks(filteredTechStack)
                .views(3)
                .build()
        );

        // when
        PagedProjectResponse actualResponses = RestAssured.given(documentationSpecification).log().all()
                .queryParams("search", filteredSearch)
                .queryParams("sort", "views")
                .queryParams("categories", List.of(filteredCategory.getName()))
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
        Project targetProject = repositoryHelper.save(new ProjectFixtureBuilder().build());
        Sector filteredSector = Sector.BE;
        Sector unfilteredSector = Sector.FE;
        String filteredSearch = "모아온";
        String unfilteredSearch = "핏토링";

        Article filteredArticle1 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(targetProject)
                        .sector(filteredSector)
                        .title(filteredSearch)
                        .build()
        );
        Article filteredArticle2 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(targetProject)
                        .sector(filteredSector)
                        .summary(filteredSearch)
                        .build()
        );
        Article filteredArticle3 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(targetProject)
                        .sector(filteredSector)
                        .content(filteredSearch)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .sector(filteredSector)
                        .title(filteredSearch)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(targetProject)
                        .sector(unfilteredSector)
                        .title(filteredSearch)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(targetProject)
                        .sector(filteredSector)
                        .title(unfilteredSearch)
                        .build()
        );

        when(articleDocumentRepository.searchInProject(eq(targetProject), any(ArticleQueryCondition.class)))
                .thenReturn(new DBArticleSearchResult(
                        List.of(filteredArticle1, filteredArticle2, filteredArticle3),
                        6, 20, null
                ));

        // when
        ProjectArticleResponse actualResponse = RestAssured.given(documentationSpecification).log().all()
                .queryParams("sector", filteredSector.getName())
                .queryParams("search", filteredSearch)
                .filter(document(projectArticlesResponseFields(), projectArticleQueryParameters()))
                .when().get("/projects/{id}/articles", targetProject.getId())
                .then().log().all()
                .statusCode(200)
                .extract().as(ProjectArticleResponse.class);

        // then
        assertAll(
                () -> assertThat(actualResponse.counts())
                        .containsExactlyInAnyOrder(
                                new ArticleSectorCount("all", 5),
                                ArticleSectorCount.of(Sector.BE, 4),
                                ArticleSectorCount.of(Sector.FE, 1),
                                ArticleSectorCount.of(Sector.IOS, 0),
                                ArticleSectorCount.of(Sector.ANDROID, 0),
                                ArticleSectorCount.of(Sector.INFRA, 0),
                                ArticleSectorCount.of(Sector.NON_TECH, 0)
                        ),
                () -> assertThat(actualResponse.articles())
                        .extracting(ArticleDetailResponse::id)
                        .containsExactlyInAnyOrder(
                                filteredArticle1.getId(),
                                filteredArticle2.getId(),
                                filteredArticle3.getId()
                        )
        );
    }

    private RequestFieldsSnippet projectCreateRequestFields() {
        return requestFields(
                fieldWithPath("title").description("프로젝트 제목"),
                fieldWithPath("summary").description("프로젝트 요약"),
                fieldWithPath("description").description("프로젝트 상세 설명"),
                fieldWithPath("techStacks").description("사용된 기술 스택 목록"),
                fieldWithPath("categories").description("프로젝트 카테고리 목록"),
                fieldWithPath("githubUrl").description("GitHub 저장소 URL").optional(),
                fieldWithPath("productionUrl").description("배포 URL").optional(),
                fieldWithPath("imageKeys").description("프로젝트 이미지 URL 목록").optional()
        );
    }

    private ResponseFieldsSnippet projectCreateResponseFields() {
        return responseFields(
                fieldWithPath("id").description("생성된 프로젝트 ID")
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
                parameterWithName("sort").description("정렬 기준 (views, loves, createdAt, articleCount)").optional(),
                parameterWithName("categories").description("카테고리 목록").optional(),
                parameterWithName("techStacks").description("기술 스택 목록").optional(),
                parameterWithName("limit").description("요청 데이터 개수 | Max: 100"),
                parameterWithName("cursor").description("이전 요청의 마지막 데이터 식별자 (정렬기준_id)").optional()
        );
    }

    private ResponseFieldsSnippet projectArticlesResponseFields() {
        return responseFields(
                subsectionWithPath("counts").description("직군별 아티클 개수 목록"),
                fieldWithPath("counts[].sector").description("직군"),
                fieldWithPath("counts[].count").description("해당 직군 아티클 개수"),

                subsectionWithPath("articles").description("아티클 데이터 목록"),
                fieldWithPath("articles[].id").description("아티클 ID"),
                fieldWithPath("articles[].title").description("아티클 제목"),
                fieldWithPath("articles[].summary").description("아티클 요약"),
                fieldWithPath("articles[].clicks").description("아티클 클릭수"),
                fieldWithPath("articles[].techStacks").description("기술 스택 목록").optional(),
                fieldWithPath("articles[].url").description("아티클 URL"),
                fieldWithPath("articles[].sector").description("직군"),
                fieldWithPath("articles[].topics").description("아티클 주제"),
                fieldWithPath("articles[].createdAt").description("생성일시")
        );
    }

    private QueryParametersSnippet projectArticleQueryParameters() {
        return queryParameters(
                parameterWithName("search").description("검색어").optional(),
                parameterWithName("sector").description("직군").optional()
        );
    }
}
