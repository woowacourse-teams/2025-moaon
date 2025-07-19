package moaon.backend.global.exception.dto;

import java.time.LocalDateTime;
import moaon.backend.global.exception.custom.ErrorCode;

public record ErrorResponse(
        String errorId,
        String message,
        LocalDateTime timestamp
) {

    public static ErrorResponse from(ErrorCode errorCode) {
        return new ErrorResponse(
                errorCode.getId(),
                errorCode.getMessage(),
                LocalDateTime.now()
        );
    }
}
