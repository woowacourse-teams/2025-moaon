package moaon.backend.member.controller;

import lombok.RequiredArgsConstructor;
import moaon.backend.member.domain.Member;
import moaon.backend.member.dto.LoginStatusResponse;
import moaon.backend.member.service.OAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final OAuthService oAuthService;

    @GetMapping("/auth/me")
    public ResponseEntity<LoginStatusResponse> loginCheck(
            @CookieValue(value = "token", required = false) String token
    ) {
        boolean isTokenValid = oAuthService.isValidToken(token);
        LoginStatusResponse response = getResponse(token, isTokenValid);
        return ResponseEntity.ok(response);
    }

    private LoginStatusResponse getResponse(String token, boolean isTokenValid) {
        if (isTokenValid) {
            Member member = oAuthService.getUserByToken(token);
            return new LoginStatusResponse(
                    isTokenValid,
                    member.getId(),
                    member.getName(),
                    member.getEmail()
            );
        }

        return new LoginStatusResponse(isTokenValid, null, null, null);
    }
}

