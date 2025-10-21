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
        if (token != null && oAuthService.isValidToken(token)) {
            LoginStatusResponse response = responseWithMember(token);
            return ResponseEntity.ok(response);
        }

        LoginStatusResponse response = new LoginStatusResponse(false, null, null, null);
        return ResponseEntity.ok(response);
    }

    private LoginStatusResponse responseWithMember(String token) {
        Member member = oAuthService.getUserByToken(token);
        return new LoginStatusResponse(
                true,
                member.getId(),
                member.getName(),
                member.getEmail()
        );
    }
}

