package moaon.backend.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import moaon.backend.member.dto.LoginStatusResponse;
import moaon.backend.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtTokenService jwtTokenService;

    @Transactional
    public void increaseCrawlCount(long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        member.addCrawlCount();
        log.info("사용자의 일일 AI요약 가능 횟수가 증가했습니다. memberId: {}, 오늘 남은 횟수: {}", memberId, member.getTodayRemainingTokens());
    }

    public Member getUserByToken(String token) {
        jwtTokenService.validateToken(token);

        Long memberId = jwtTokenService.extractMemberId(token);
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.UNAUTHORIZED_MEMBER));
    }

    public LoginStatusResponse checkLogin(String token) {
        try {
            Member member = getUserByToken(token);
            return LoginStatusResponse.withMember(member);

        } catch (CustomException e) {
            return LoginStatusResponse.notLoggedIn();
        }
    }
}
