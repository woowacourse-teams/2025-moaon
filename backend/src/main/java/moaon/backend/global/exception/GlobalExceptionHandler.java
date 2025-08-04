package moaon.backend.global.exception;

import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.exception.dto.ErrorResponse;
import moaon.backend.global.exception.dto.ExceptionLogInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        ErrorCode errorCode = e.getErrorCode();

        ExceptionLogInfo logInfo = ExceptionLogInfo.fromCurrentRequest();
        log.warn("[{}] {} {} | {} {}",
                errorCode.name(),
                errorCode.getId(),
                errorCode.getMessage(),
                logInfo.httpMethod(),
                logInfo.requestURI()
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        ErrorCode errorCode = ErrorCode.RESOURCE_NOT_FOUND;

        ExceptionLogInfo logInfo = ExceptionLogInfo.fromCurrentRequest();
        log.warn("[{}] {} {} | {} {} | Detail: {}",
                errorCode.name(),
                errorCode.getId(),
                errorCode.getMessage(),
                logInfo.httpMethod(),
                logInfo.requestURI(),
                e.getMessage()
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnknownException(Exception e) {
        ErrorCode errorCode = ErrorCode.UNKNOWN;

        ExceptionLogInfo logInfo = ExceptionLogInfo.fromCurrentRequest();
        log.error("[{}] {} {} | {} {} | Detail: {}",
                errorCode.name(),
                errorCode.getId(),
                errorCode.getMessage(),
                logInfo.httpMethod(),
                logInfo.requestURI(),
                e.getMessage(),
                e
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }
}
