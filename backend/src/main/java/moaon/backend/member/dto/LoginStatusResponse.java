package moaon.backend.member.dto;

public record LoginStatusResponse(
        boolean isLoggedIn,
        Long id,
        String name,
        String email
) {
}
