package moaon.backend.member.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import moaon.backend.member.dto.JwtToken;
import moaon.backend.member.service.GoogleLoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login/oauth2/code/google")
@RequiredArgsConstructor
public class GoogleLoginController {

    private final GoogleLoginService googleLoginService;

    @PostMapping
    public ResponseEntity<Void> login(
            @RequestParam String code,
            HttpServletResponse response
    ) {
        JwtToken token = googleLoginService.login(code);
        response.addCookie(new Cookie("token", token.token()));
        return ResponseEntity.ok().build();
    }
}
