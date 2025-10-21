package moaon.backend.api.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;

import io.restassured.RestAssured;
import moaon.backend.api.BaseApiTest;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.member.domain.Member;
import moaon.backend.member.dto.LoginStatusResponse;
import moaon.backend.member.service.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.cookies.RequestCookiesSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;

@Import({RepositoryHelper.class, QueryDslConfig.class})
public class MemberApiTest extends BaseApiTest {

    @Autowired
    private RepositoryHelper helper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("GET /auth/me: 로그인 상태 확인 API")
    @Test
    void loginCheck() {
        // given
        Member member = Fixture.anyMember();
        Member savedMember = helper.save(member);

        String token = jwtTokenProvider.createToken(member.getId());

        // when - then
        LoginStatusResponse statusResponse = RestAssured.given(documentationSpecification).log().all()
                .cookie("token", token)
                .filter(document(loginCheckRequestCookies(), loginCheckResponseFields()))
                .when().get("/auth/me")
                .then().log().all()
                .statusCode(200)
                .extract().as(LoginStatusResponse.class);

        assertAll(
                () -> assertThat(statusResponse.isLoggedIn()).isTrue(),
                () -> assertThat(statusResponse.id()).isEqualTo(savedMember.getId()),
                () -> assertThat(statusResponse.name()).isEqualTo(savedMember.getName()),
                () -> assertThat(statusResponse.email()).isEqualTo(savedMember.getEmail())
        );
    }

    private static RequestCookiesSnippet loginCheckRequestCookies() {
        return requestCookies(
                cookieWithName("token").description("사용자 로그인 토큰").optional()
        );
    }

    private static ResponseFieldsSnippet loginCheckResponseFields() {
        return responseFields(
                fieldWithPath("isLoggedIn").description("로그인 상태 여부"),
                fieldWithPath("id").description("멤버 ID"),
                fieldWithPath("name").description("이름"),
                fieldWithPath("email").description("이메일")
        );
    }
}
