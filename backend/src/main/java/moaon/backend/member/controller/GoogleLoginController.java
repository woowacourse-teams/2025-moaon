package moaon.backend.member.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.member.dto.JwtToken;
import moaon.backend.member.dto.LoginResponse;
import moaon.backend.member.service.GoogleLoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/login/oauth2/code/google")
@RequiredArgsConstructor
public class GoogleLoginController {

    private final GoogleLoginService googleLoginService;

    @GetMapping
    public ResponseEntity<LoginResponse> login(
            @RequestParam String code,
            HttpServletResponse response
    ) {
        try {
            JwtToken token = googleLoginService.login(code);
            Cookie cookie = new Cookie("token", token.token());
            response.addCookie(new Cookie("token", token.token()));
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");

            cookie.setMaxAge(60 * 60 * 24);
            cookie.setAttribute("SameSite", "None");
            response.addCookie(cookie);

            return ResponseEntity.ok(new LoginResponse("/oauth/callback/success"));
        } catch (Exception e) {
            log.error("구글 로그인에 실패했습니다.", e);
            return ResponseEntity.ok(new LoginResponse("/oauth/callback/failed"));
        }
    }
}
