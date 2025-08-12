package moaon.backend.global.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

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
        String overMaxLength = "A".repeat(SearchKeyword.getMaxLength()) + "A";
        assertThatThrownBy(() -> new SearchKeyword(overMaxLength))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.INVALID_SEARCH_KEYWORD_LENGTH.getMessage());
    }

    @DisplayName("검색어에 특수문자가 포함된 경우 특수문자를 주어진 문자로 치환한다.")
    @ParameterizedTest
    @CsvSource(delimiterString = " -> ", value = {
            "깃-들다 -> 깃 들다",
            "A\"B -> A B",
            "A,B,C -> A B C",
            "A!B@C#D -> A B C D"
    })
    void valueWithSpecialChars(String keyword, String expected) {
        SearchKeyword searchKeyword = new SearchKeyword(keyword);

        String blank = " ";
        String actual = searchKeyword.replaceSpecialCharacters(blank);

        assertThat(actual).isEqualTo(expected);
    }
}
