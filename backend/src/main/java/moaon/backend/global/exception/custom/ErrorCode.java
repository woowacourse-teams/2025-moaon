package moaon.backend.global.exception.custom;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    UNKNOWN_ERROR("UNKNOWN-001", "예기치 못한 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    PROJECT_NOT_FOUND("PROJECT-001", "프로젝트를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);

    private final String id;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(String id, String message, HttpStatus httpStatus) {
        this.id = id;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
