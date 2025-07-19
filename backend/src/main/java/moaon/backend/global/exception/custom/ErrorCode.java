package moaon.backend.global.exception.custom;

import lombok.Getter;

@Getter
public enum ErrorCode {

    PROJECT_NOT_FOUND("PROJECT-001", "프로젝트를 찾을 수 없습니다.");

    private final String id;
    private final String message;

    ErrorCode(String id, String message) {
        this.id = id;
        this.message = message;
    }
}
