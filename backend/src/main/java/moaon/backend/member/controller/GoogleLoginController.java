package moaon.backend.member.controller;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.json.JsonException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.dto.JwtToken;
import moaon.backend.member.service.GoogleLoginService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/login/oauth2/code/google")
@RequiredArgsConstructor
public class GoogleLoginController {

    private static final String REDIRECT_BASE_KEY = "redirectBase";

    private final GoogleLoginService googleLoginService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public void login(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "state") String state,
            HttpServletResponse response
    ) {
        String redirectBase = parseRedirectBase(state);

        try {
            JwtToken token = googleLoginService.login(code);
            Cookie cookie = createTokenCookie(token);
            response.addCookie(cookie);
            response.sendRedirect(redirectBase + "/oauth/callback/success");
            log.info("구글 로그인에 성공하여 리다이렉트 되었습니다. redirectBase: {}", redirectBase);

        } catch (Exception ex) {
            try {
                response.sendRedirect(redirectBase + "/oauth/callback/failed");
                log.warn("구글 로그인에 실패하여 리다이렉트 되었습니다. redirectBase: {}", redirectBase, ex);

            } catch (IOException e) {
                log.error("구글 로그인 및 리디렉션에 실패했습니다.", e);
                throw new CustomException(ErrorCode.UNKNOWN, e);
            }
        }
    }

    private String parseRedirectBase(String state) {
        try {
            String urlDecodedState = URLDecoder.decode(state, StandardCharsets.UTF_8);
            Map<?, ?> stateMap = objectMapper.readValue(urlDecodedState, Map.class);
            return (String) Optional.ofNullable(stateMap.get(REDIRECT_BASE_KEY))
                    .orElseThrow(() -> new CustomException(ErrorCode.LOGIN_REDIRECT_FAILED));

        } catch (JsonException | JacksonException jsonEx) {
            log.warn("구글 로그인에 실패했습니다. redirectBase를 파싱할 수 없습니다.", jsonEx);
            throw new CustomException(ErrorCode.LOGIN_REDIRECT_FAILED, jsonEx);
        }
    }

    private Cookie createTokenCookie(JwtToken token) {
        Cookie cookie = new Cookie("token", token.token());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        cookie.setMaxAge(60 * 60 * 24);
        cookie.setAttribute("SameSite", "None");
        return cookie;
    }
}
