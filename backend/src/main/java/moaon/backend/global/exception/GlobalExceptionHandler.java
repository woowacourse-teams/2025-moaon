package moaon.backend.global.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.exception.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.from(e.getErrorCode()));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        ErrorCode errorCode = ErrorCode.RESOURCE_NOT_FOUND;

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String requestURI = "unknown";
        String httpMethod = "unknown";

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            requestURI = request.getRequestURI();
            httpMethod = request.getMethod();
        }

        log.warn("[{}] Method: {}, Path: {}, Error ID: {}, Detail: {}",
                errorCode.getName(),
                httpMethod,
                requestURI,
                errorCode.getId(),
                e.getMessage()
        );
        
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUncaughtException(Exception e) { // TODO 위에 맞춰서 개선
        log.error("[Unhandled Exception] {}", e.getMessage(), e);
        ErrorCode unknownError = ErrorCode.UNKNOWN;
        return ResponseEntity
                .status(unknownError.getHttpStatus())
                .body(ErrorResponse.from(unknownError));
    }
}
