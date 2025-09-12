package moaon.backend.global.exception;

import static java.util.stream.Collectors.joining;

import com.fasterxml.jackson.databind.JsonMappingException.Reference;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import jakarta.annotation.Nullable;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.exception.dto.ErrorResponse;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        ErrorCode errorCode = e.getErrorCode();

        log.warn("[{}] {} {}",
                errorCode.name(),
                errorCode.getId(),
                errorCode.getMessage()
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        return handleMvcStandardException(ErrorCode.RESOURCE_NOT_FOUND, e);
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse> handleHandlerMethodValidationException(HandlerMethodValidationException e) {
        log.info("error: {}", e.getMessage());
        return handleMvcStandardException(ErrorCode.HANDLER_METHOD_VALIDATION, e);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e
    ) {
        String detailMessage = String.format("쿼리 파라미터 '%s'(%s)가 누락되었습니다.", e.getParameterName(), e.getParameterType());
        return handleMvcStandardException(ErrorCode.MISSING_REQUIRED_PARAMETER, e, detailMessage);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e
    ) {
        return handleMvcStandardException(ErrorCode.HTTP_METHOD_NOT_SUPPORTED, e);
    }

    @ExceptionHandler(TypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatchException(TypeMismatchException e) {
        String detailMessage = String.format(
                "파라미터 '%s'(%s)와 자료형이 일치하지 않습니다 : '%s'",
                e.getPropertyName(), e.getRequiredType(), e.getValue()
        );
        return handleMvcStandardException(ErrorCode.TYPE_MISMATCH, e, detailMessage);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        if (e.getCause() instanceof InvalidFormatException ex) {
            String fieldName = ex.getPath().stream().map(Reference::getFieldName).collect(joining("."));
            Object inputValue = ex.getValue();

            String detailMessage = String.format(
                    "필드 '%s'의 형식이 일치하지 않습니다. 입력: '%s'",
                    fieldName, inputValue
            );
            return handleMvcStandardException(ErrorCode.HTTP_MESSAGE_NOT_READABLE, e, detailMessage);
        }

        return handleMvcStandardException(ErrorCode.HTTP_MESSAGE_NOT_READABLE, e);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String detailMessage = e.getFieldErrors().stream()
                .map(FieldError::getField)
                .map(field -> String.format("필드 '%s'에 대한 검증에 실패했습니다.", field))
                .collect(joining("\n"));
        return handleMvcStandardException(ErrorCode.ARGUMENT_NOT_VALID, e, detailMessage);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnknownException(Exception e) {
        ErrorCode errorCode = ErrorCode.UNKNOWN;

        log.error("[{}] {} {} | Exception Message: {}",
                errorCode.name(),
                errorCode.getId(),
                errorCode.getMessage(),
                e.getMessage(),
                e
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode));
    }

    private ResponseEntity<ErrorResponse> handleMvcStandardException(ErrorCode errorCode, Exception exception) {
        return this.handleMvcStandardException(errorCode, exception, null);
    }

    private ResponseEntity<ErrorResponse> handleMvcStandardException(
            ErrorCode errorCode,
            Exception exception,
            @Nullable String detailMessage
    ) {
        log.warn("[{}] {} {} | Exception Message: {}",
                errorCode.name(),
                errorCode.getId(),
                errorCode.getMessage(),
                exception.getMessage()
        );

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.from(errorCode, detailMessage));
    }
}
