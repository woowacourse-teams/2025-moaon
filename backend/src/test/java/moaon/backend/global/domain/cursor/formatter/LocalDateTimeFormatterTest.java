package moaon.backend.global.domain.cursor.formatter;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class LocalDateTimeFormatterTest {

    @DisplayName("LocalDateTime 형식의 정렬 기준 값을 파싱한다.")
    @Test
    void parseSortValue() {
        // given
        LocalDateTimeFormatter formatter = new LocalDateTimeFormatter();

        // when
        LocalDateTime parsed = formatter.parseSortValue("2024-07-31T10:00:00");

        // then
        LocalDateTime _2024_07_31_10_00_00 = LocalDateTime.of(2024, 7, 31, 10, 0);
        assertThat(parsed).isEqualTo(_2024_07_31_10_00_00);
    }

    @DisplayName("LocalDateTime 형식의 정렬 기준 값과 아이디를 가지고 커서 문자열을 만든다.")
    @Test
    void format() {
        // given
        LocalDateTimeFormatter formatter = new LocalDateTimeFormatter();
        LocalDateTime _2024_07_31_10_00_00 = LocalDateTime.of(2024, 7, 31, 10, 0);

        // when
        String formatted = formatter.format(_2024_07_31_10_00_00, 12345L);

        // then
        assertThat(formatted).isEqualTo("2024-07-31T10:00:00_12345");
    }
}
