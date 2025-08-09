package moaon.backend.global.exception.custom;

import lombok.Getter;
import moaon.backend.global.domain.SearchKeyword;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    UNKNOWN("GLOBAL-001", "예기치 못한 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    RESOURCE_NOT_FOUND("GLOBAL-002", "요청한 리소스를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    MISSING_REQUIRED_PARAMETER("GLOBAL-003", "필수 요청 파라미터가 누락되었습니다.", HttpStatus.BAD_REQUEST),
    HTTP_METHOD_NOT_SUPPORTED("GLOBAL-004", "지원하지 않는 HTTP 메서드입니다.", HttpStatus.BAD_REQUEST),
    TYPE_MISMATCH("GLOBAL-005", "요청 데이터의 자료형이 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    HTTP_MESSAGE_NOT_READABLE("GLOBAL-006", "요청 본문을 파싱하지 못했습니다. 형식을 확인해 주세요.", HttpStatus.BAD_REQUEST),
    ARGUMENT_NOT_VALID("GLOBAL-007", "요청 데이터에 대한 검증에 실패했습니다.", HttpStatus.BAD_REQUEST),

    PROJECT_NOT_FOUND("PROJECT-001", "프로젝트를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    ARTICLE_NOT_FOUND("ARTICLE-001", "아티클을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    INVALID_CURSOR_FORMAT("CURSOR-001", "커서 파라미터 형식이 올바르지 않습니다.", HttpStatus.BAD_REQUEST),

    INVALID_SEARCH_KEYWORD_LENGTH(
            "SEARCH-001",
            String.format("검색어는 %d자 이상 %d자 이하여야 합니다.", SearchKeyword.MIN_LENGTH, SearchKeyword.MAX_LENGTH),
            HttpStatus.BAD_REQUEST
    );

    private final String id;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(String id, String message, HttpStatus httpStatus) {
        this.id = id;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
