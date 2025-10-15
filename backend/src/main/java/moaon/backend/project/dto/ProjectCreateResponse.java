package moaon.backend.project.dto;

public record ProjectCreateResponse(
        Long id
) {

    public static ProjectCreateResponse from(Long id) {
        return new ProjectCreateResponse(id);
    }
}
