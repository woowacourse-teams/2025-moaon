package moaon.backend.member.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.member.dto.LoginStatusResponse;
import moaon.backend.member.service.OAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final OAuthService oAuthService;

    @RequestMapping("/auth/me")
    public ResponseEntity<LoginStatusResponse> loginCheck(
            @CookieValue(value = "token", required = false) String token
    ) {
        LoginStatusResponse loginStatus = new LoginStatusResponse(oAuthService.isValidToken(token));
        return ResponseEntity.ok(loginStatus);
    }
}

