package moaon.backend.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void increaseCrawlCount(long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        member.addCrawlCount();
        log.info("사용자의 일일 AI요약 가능 횟수가 증가했습니다. memberId: {}, 오늘 남은 횟수: {}", memberId, member.getTodayRemainingTokens());
    }
}
