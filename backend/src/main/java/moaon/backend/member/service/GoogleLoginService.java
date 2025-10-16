package moaon.backend.member.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import moaon.backend.member.domain.Member;
import moaon.backend.member.dto.JwtToken;
import moaon.backend.member.dto.UserInformation;
import moaon.backend.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoogleLoginService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final GoogleOAuthClient client;

    public JwtToken login(String code) {
        UserInformation userInformation = client.getUserInformation(code);
        Member member = registerIfNewUser(userInformation);
        return new JwtToken(jwtTokenProvider.createToken(member.getId()));
    }

    private Member registerIfNewUser(UserInformation userInformation) {
        Optional<Member> memberOptional = memberRepository.findBySocialId(userInformation.id());
        if (memberOptional.isPresent()) {
            return memberOptional.get();
        }

        Member member = new Member(
                userInformation.id(),
                userInformation.email(),
                userInformation.name()
        );
        return memberRepository.save(member);
    }
}
