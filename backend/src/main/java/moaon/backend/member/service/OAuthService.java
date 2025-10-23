package moaon.backend.member.service;

import lombok.RequiredArgsConstructor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public Member getUserByToken(String token) {
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.UNAUTHORIZED_MEMBER));
    }

    public void validateToken(String token) {
        if (!jwtTokenProvider.isValidToken(token)) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER);
        }
    }

    public boolean isValidToken(String token) {
        return jwtTokenProvider.isValidToken(token);
    }
}
