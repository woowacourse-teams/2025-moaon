package moaon.backend.global.exception.custom;

import org.springframework.http.HttpStatus;

public abstract class CustomException extends RuntimeException {

    private final ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public abstract HttpStatus getStatus();
}
