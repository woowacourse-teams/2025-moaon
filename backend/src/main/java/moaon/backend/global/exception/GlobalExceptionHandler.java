package moaon.backend.global.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.exception.dto.ErrorResponse;
import org.springframework.http.HttpHeaders;
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
        ErrorCode errorCode = e.getErrorCode();

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String httpMethod = "unknown";
        String requestURI = "unknown";
        String clientIP = "unknown";
        String userAgent = "unknown";

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            httpMethod = request.getMethod();
            requestURI = request.getRequestURI();
            clientIP = request.getRemoteAddr();
            userAgent = request.getHeader(HttpHeaders.USER_AGENT);
        }

        log.warn("[{}] Error ID: {}, Method: {}, Path: {}, Detail: {}, Client IP: {}, User-Agent: {}",
                errorCode.name(),
                errorCode.getId(),
                httpMethod,
                requestURI,
                e.getMessage(),
                clientIP,
                userAgent
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        ErrorCode errorCode = ErrorCode.RESOURCE_NOT_FOUND;

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String httpMethod = "unknown";
        String requestURI = "unknown";
        String clientIP = "unknown";
        String userAgent = "unknown";

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            httpMethod = request.getMethod();
            requestURI = request.getRequestURI();
            clientIP = request.getRemoteAddr();
            userAgent = request.getHeader(HttpHeaders.USER_AGENT);
        }

        log.warn("[{}] Error ID: {}, Method: {}, Path: {}, Detail: {}, Client IP: {}, User-Agent: {}",
                errorCode.name(),
                errorCode.getId(),
                httpMethod,
                requestURI,
                e.getMessage(),
                clientIP,
                userAgent
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnknownException(Exception e) {
        ErrorCode errorCode = ErrorCode.UNKNOWN;

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String httpMethod = "unknown";
        String requestURI = "unknown";
        String clientIP = "unknown";
        String userAgent = "unknown";

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            httpMethod = request.getMethod();
            requestURI = request.getRequestURI();
            clientIP = request.getRemoteAddr();
            userAgent = request.getHeader(HttpHeaders.USER_AGENT);
        }

        log.error("[{}] Error ID: {}, Method: {}, Path: {}, Client IP: {}, User-Agent: {}",
                errorCode.name(),
                errorCode.getId(),
                httpMethod,
                requestURI,
                clientIP,
                userAgent,
                e
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }
}
