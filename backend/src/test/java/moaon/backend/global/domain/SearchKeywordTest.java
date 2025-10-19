package moaon.backend.global.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

class SearchKeywordTest {

    @DisplayName("검색어의 길이가 최대 길이를 초과한 경우 예외를 발생시킨다.")
    @Test
    void greaterThanMaxLength() {
        String overMaxLength = "A".repeat(SearchKeyword.getMaxLength()) + "A";
        assertThatThrownBy(() -> new SearchKeyword(overMaxLength))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.INVALID_SEARCH_KEYWORD_LENGTH.getMessage());
    }

    @DisplayName("값이 존재하는 지 알 수 있다. - true")
    @ParameterizedTest
    @ValueSource(strings = {"A", "A B C", "A B C D"})
    void hasValueTrue(String value) {
        SearchKeyword searchKeyword = new SearchKeyword(value);
        assertThat(searchKeyword.hasValue()).isTrue();
    }

    @DisplayName("값이 존재하는 지 알 수 있다. - false")
    @ParameterizedTest
    @ValueSource(strings = {"", "     ", "\n", "\t"})
    @NullSource
    void hasValueFalse(String value) {
        SearchKeyword searchKeyword = new SearchKeyword(value);
        assertThat(searchKeyword.hasValue()).isFalse();
    }

    @DisplayName("오직 하나의 토큰으로 이루어져 있는 지 알 수 있다. - true")
    @ParameterizedTest
    @ValueSource(strings = {"토큰", "토", "t", "엄청나게긴토큰엄청나게긴토큰엄청나게긴토큰"})
    void hasOnlyOneTokenTrue(String value) {
        SearchKeyword searchKeyword = new SearchKeyword(value);
        assertThat(searchKeyword.hasOnlyOneToken()).isTrue();
    }

    @DisplayName("오직 하나의 토큰으로 이루어져 있는 지 알 수 있다. - false")
    @ParameterizedTest
    @ValueSource(strings = {"", "토 큰", "토 큰 토 큰"})
    void hasOnlyOneTokenFalse(String value) {
        SearchKeyword searchKeyword = new SearchKeyword(value);
        assertThat(searchKeyword.hasOnlyOneToken()).isFalse();
    }

    @DisplayName("마지막 토큰을 얻는다.")
    @Test
    void lastToken() {
        SearchKeyword searchKeyword = new SearchKeyword("가 나 다 라 마");
        assertThat(searchKeyword.lastToken()).isEqualTo("마");
    }

    @DisplayName("마지막 토큰 이전까지의 모든 토큰을 텍스트로 얻는다.")
    @Test
    void wholeTextBeforeLastToken() {
        SearchKeyword searchKeyword = new SearchKeyword("배달 서비스 아키텍처 구축");
        assertThat(searchKeyword.wholeTextBeforeLastToken()).isEqualTo("배달 서비스 아키텍처");

        SearchKeyword onlyOneToken = new SearchKeyword("오직한개의토큰");
        assertThat(onlyOneToken.wholeTextBeforeLastToken()).isEmpty();
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
