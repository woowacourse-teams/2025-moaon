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
    HANDLER_METHOD_VALIDATION("GLOBAL-008", "요청 데이터에 대한 검증에 실패했습니다.", HttpStatus.BAD_REQUEST),

    PROJECT_NOT_FOUND("PROJECT-001", "프로젝트를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    PROJECT_INVALID_TITLE("PROJECT-002", "프로젝트 제목 형식에 맞지 않습니다.", HttpStatus.BAD_REQUEST),
    PROJECT_INVALID_SUMMARY("PROJECT-003", "프로젝트 요약 형식에 맞지 않습니다.", HttpStatus.BAD_REQUEST),
    PROJECT_INVALID_DESCRIPTION("PROJECT-004", "프로젝트 설명 형식에 맞지 않습니다.", HttpStatus.BAD_REQUEST),
    PROJECT_INVALID_TECHSTACK("PROJECT-005", "프로젝트의 기술 스택은 중복을 제외하고 1 ~ 20 개 입니다.", HttpStatus.BAD_REQUEST),
    PROJECT_INVALID_CATEGORY("PROJECT-006", "프로젝트의 카테고리는 중복을 제외하고 1 ~ 5 개입니다", HttpStatus.BAD_REQUEST),
    PROJECT_INVALID_IMAGE("PROJECT-007", "프로젝트의 이미지는 0 ~ 10 개입니다.", HttpStatus.BAD_REQUEST),

    ARTICLE_NOT_FOUND("ARTICLE-001", "아티클을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    ARTICLE_INVALID_TECHSTACK("ARTICLE-005", "아티클의 기술 스택은 중복을 제외하고 0 ~ 3 개 입니다.", HttpStatus.BAD_REQUEST),
    ARTICLE_INVALID_TOPICS("ARTICLE-005", "아티클의 토픽은 중복을 제외하고 1 ~ 3 개 입니다.", HttpStatus.BAD_REQUEST),
    // 권한이 필요한 url
    ARTICLE_URL_FORBIDDEN("URL-001", "접근 권한이 없는 URL 입니다.", HttpStatus.FORBIDDEN),
    // 잘못된 url
    ARTICLE_URL_NOT_FOUND("URL-002", "존재하지 않는 URL 입니다.", HttpStatus.NOT_FOUND),
    // 삭제된 url
    ARTICLE_URL_GONE("URL-003", "삭제된 페이지입니다.", HttpStatus.GONE),
    // 크롤 실패,
    ARTICLE_CRAWL_FAILED("URL-004", "아티클 크롤링 실패입니다.", HttpStatus.INTERNAL_SERVER_ERROR),

    UNAUTHORIZED_MEMBER("MEMBER-001", "등록된 회원이 아닙니다. 로그인 후 이용 가능합니다.", HttpStatus.UNAUTHORIZED),

    CONTENT_FINDER_NOT_FOUND("CONTENT-001", "등록할 수 없는 URL 입니다.", HttpStatus.BAD_REQUEST),

    TECHSTACK_NOT_FOUND("TECHSTACK-001", "테크스택을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    CATEGORY_NOT_FOUND("CATEGORY-001", "카테고리를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    INVALID_CURSOR_FORMAT("CURSOR-001", "커서 파라미터 형식이 올바르지 않습니다.", HttpStatus.BAD_REQUEST),

    INVALID_SEARCH_KEYWORD_LENGTH(
            "SEARCH-001",
            String.format("검색어는 %d자 이상 %d자 이하여야 합니다.", SearchKeyword.getMinLength(), SearchKeyword.getMaxLength()),
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
