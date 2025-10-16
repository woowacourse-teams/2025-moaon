package moaon.backend.member.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UserInformation(
        String id,
        String email,
        String name
) {
}
