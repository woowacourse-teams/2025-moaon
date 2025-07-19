package moaon.backend.global.exception;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        return ResponseEntity
                .status(e.getStatus())
                .body(ErrorResponse.from(e.getErrorCode()));
    }
}
