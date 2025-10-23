package moaon.backend.member.dto;

import moaon.backend.member.domain.Member;

public record LoginStatusResponse(
        boolean isLoggedIn,
        Long id,
        String name,
        String email
) {

    public static LoginStatusResponse withMember(Member member) {
        return new LoginStatusResponse(
                true,
                member.getId(),
                member.getName(),
                member.getEmail()
        );
    }

    public static LoginStatusResponse notLoggedIn() {
        return new LoginStatusResponse(false, null, null, null);
    }
}
