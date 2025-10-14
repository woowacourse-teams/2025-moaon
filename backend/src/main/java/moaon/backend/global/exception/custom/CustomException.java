package moaon.backend.global.exception.custom;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final ErrorCode errorCode;
    private Throwable throwable;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public CustomException(ErrorCode errorCode, Throwable throwable) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.throwable = throwable;
    }
}
