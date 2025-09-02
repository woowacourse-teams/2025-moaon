package moaon.backend.global.parser;

import static moaon.backend.global.exception.custom.ErrorCode.INVALID_CURSOR_FORMAT;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import moaon.backend.global.exception.custom.CustomException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

class LocalDateTimeParserTest {

    @DisplayName("lastValue 가 null 또는 빈 문자열이면 예외를 발생한다.")
    @ParameterizedTest
    @NullSource
    @ValueSource(strings = {""})
    void shouldThrowException_whenValueIsNullOrEmpty(String invalidValue) {
        // when then
        assertThatThrownBy(() -> LocalDateTimeParser.toLocalDateTime(invalidValue))
                .isInstanceOf(CustomException.class)
                .hasMessage(INVALID_CURSOR_FORMAT.getMessage());
    }
}
