package moaon.backend.global.exception.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import java.time.LocalDateTime;
import moaon.backend.global.exception.custom.ErrorCode;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
        String errorId,
        String message,
        @Nullable String detailMessage,
        LocalDateTime timestamp
) {

    public static ErrorResponse from(ErrorCode errorCode) {
        return from(errorCode, null);
    }

    public static ErrorResponse from(ErrorCode errorCode, @Nullable String detailMessage) {
        return new ErrorResponse(
                errorCode.getId(),
                errorCode.getMessage(),
                detailMessage,
                LocalDateTime.now()
        );
    }
}
