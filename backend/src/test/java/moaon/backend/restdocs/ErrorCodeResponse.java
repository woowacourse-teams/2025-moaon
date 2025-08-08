package moaon.backend.restdocs;

import moaon.backend.global.exception.custom.ErrorCode;
import org.springframework.http.HttpStatus;

public record ErrorCodeResponse(
        String code,
        String name,
        String message,
        HttpStatus status
) {

    public ErrorCodeResponse(ErrorCode errorCode) {
        this(
                errorCode.getId(),
                errorCode.name(),
                errorCode.getMessage(),
                errorCode.getHttpStatus()
        );
    }
}
