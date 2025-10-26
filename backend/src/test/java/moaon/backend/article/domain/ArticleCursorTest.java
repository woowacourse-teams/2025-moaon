package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ArticleCursorTest {

    @DisplayName("sortValue와 lastId값으로 커서를 만든다.")
    @Test
    void constructWithValues() {
        LocalDateTime localDateTime = LocalDateTime.now();

        ArticleCursor cursor = new ArticleCursor(localDateTime, 1L);

        assertAll(
                () -> assertThat(cursor.getSortValue()).isEqualTo(localDateTime),
                () -> assertThat(cursor.getLastId()).isEqualTo(1L)
        );
    }

    @DisplayName("문자열을 읽어 커서를 만든다.")
    @Test
    void constructWithRawString() {
        String rawString = "2025-09-25T04:35:00.764_35867";

        ArticleCursor cursor = new ArticleCursor(rawString);

        assertAll(
                () -> assertThat(cursor.getSortValue()).isEqualTo("2025-09-25T04:35:00.764"),
                () -> assertThat(cursor.getLastId()).isEqualTo(35867L)
        );
    }

    @DisplayName("커서를 문자열로 직렬화하면 sortValue_lastId 형식이 된다.")
    @Test
    void asString() {
        ArticleCursor cursor = new ArticleCursor(1.23, 1L);
        assertThat(cursor.toString()).isEqualTo("1.23_1");
    }

    @DisplayName("커서의 값을 얻는다.")
    @Test
    void getSortValue() {
        ArticleCursor cursor = new ArticleCursor(1.23, 1L);
        assertThat(cursor.getSortValue()).isEqualTo(1.23);
    }

    @DisplayName("커서의 대상 ID를 얻는다.")
    @Test
    void getLastId() {
        ArticleCursor cursor = new ArticleCursor(1.23, 1L);
        assertThat(cursor.getLastId()).isEqualTo(1L);
    }

    @DisplayName("Mapper를 전달 해 매핑된 sortValue를 얻는다.")
    @Test
    void getSortValueAs() {
        ArticleCursor cursor = new ArticleCursor("디귿", 1L);

        Character firstCharacter = cursor.getSortValueAs(sortValue -> sortValue.toString().charAt(0));
        assertThat(firstCharacter).isEqualTo('디');
    }

    @DisplayName("LocalDateTime 형태로 sortValue를 얻는다.")
    @Test
    void getSortValueAsLocalDateTime() {
        LocalDateTime dateTime = LocalDateTime.now();
        ArticleCursor cursor = new ArticleCursor(dateTime, 1L);

        LocalDateTime sortValue = cursor.getSortValueAsLocalDateTime();

        assertThat(sortValue).isEqualTo(dateTime);
    }

    @DisplayName("Integer 형태로 sortValue를 얻는다.")
    @Test
    void getSortValueAsInt() {
        ArticleCursor cursor = new ArticleCursor(123, 1L);

        int sortValue = cursor.getSortValueAsInt();

        assertThat(sortValue).isEqualTo(123);
    }

    @DisplayName("Double 형태로 sortValue를 얻는다.")
    @Test
    void getSortValueAsDouble() {
        ArticleCursor cursor = new ArticleCursor(0.1, 1L);

        double sortValue = cursor.getSortValueAsDouble();

        assertThat(sortValue).isEqualTo(0.1);
    }

    @DisplayName("Long 형태로 sortValue를 얻는다.")
    @Test
    void getSortValueAsLong() {
        ArticleCursor cursor = new ArticleCursor(12345L, 1L);

        long sortValue = cursor.getSortValueAsLong();

        assertThat(sortValue).isEqualTo(12345L);
    }
}
