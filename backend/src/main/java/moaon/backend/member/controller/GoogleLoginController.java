package moaon.backend.member.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.dto.JwtToken;
import moaon.backend.member.service.GoogleLoginService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login/oauth2/code/google")
@RequiredArgsConstructor
public class GoogleLoginController {

    private final GoogleLoginService googleLoginService;

    @GetMapping
    public void login(
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

            response.sendRedirect("/oauth/callback");
        } catch (IOException e) {
            throw new CustomException(ErrorCode.UNKNOWN, e);
        }
    }
}
