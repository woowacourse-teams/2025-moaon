package moaon.backend.global.exception;

import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.exception.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.from(e.getErrorCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handelUncaughtException(Exception e) {
        log.error(e.getMessage());
        ErrorCode unknownError = ErrorCode.UNKNOWN;
        return ResponseEntity
                .status(unknownError.getHttpStatus())
                .body(ErrorResponse.from(unknownError));
    }
}
