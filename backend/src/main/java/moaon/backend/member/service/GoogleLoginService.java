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
        registerIfNewUser(userInformation);
        return new JwtToken(jwtTokenProvider.createToken(userInformation.id()));
    }

    private void registerIfNewUser(UserInformation userInformation) {
        Optional<Member> member = memberRepository.findBySocialId(userInformation.id());
        if (member.isPresent()) {
            return;
        }

        memberRepository.save(new Member(userInformation.id(), userInformation.name(), userInformation.email()));
    }
}
