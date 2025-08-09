package moaon.backend.global.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SearchKeywordTest {

    @DisplayName("검색어의 길이가 최소 길이 미만인 경우 예외를 발생시킨다.")
    @Test
    void lessThanMinLength() {
        assertThatThrownBy(() -> new SearchKeyword("A"))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.INVALID_SEARCH_KEYWORD_LENGTH.getMessage());
    }

    @DisplayName("검색어의 길이가 최대 길이를 초과한 경우 예외를 발생시킨다.")
    @Test
    void greaterThanMaxLength() {
        String overMaxLength = "A".repeat(SearchKeyword.MAX_LENGTH) + "A";
        assertThatThrownBy(() -> new SearchKeyword(overMaxLength))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.INVALID_SEARCH_KEYWORD_LENGTH.getMessage());
    }
}
