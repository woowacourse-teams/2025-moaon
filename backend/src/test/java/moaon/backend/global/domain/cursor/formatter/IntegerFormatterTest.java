package moaon.backend.global.domain.cursor.formatter;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class IntegerFormatterTest {

    @DisplayName("Integer 형식의 정렬 기준 값을 파싱한다.")
    @Test
    void parseSortValue() {
        // given
        IntegerFormatter formatter = new IntegerFormatter();

        // when
        int parsed = formatter.parseSortValue("123");

        // then
        assertThat(parsed).isEqualTo(123);
    }

    @DisplayName("Integer 형식의 정렬 기준 값과 아이디를 가지고 커서 문자열을 만든다.")
    @Test
    void format() {
        // given
        IntegerFormatter formatter = new IntegerFormatter();

        // when
        String formatted = formatter.format(987, 12345L);

        // then
        assertThat(formatted).isEqualTo("987_12345");
    }
}
