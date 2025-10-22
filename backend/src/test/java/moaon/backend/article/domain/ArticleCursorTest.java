package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ArticleCursorTest {

    @DisplayName("커서를 지정된 형식의 문자열 형태로 얻는다.")
    @Test
    void asString() {
        ArticleCursor cursor = new ArticleCursor(1.23, 1L);
        assertThat(cursor.asString()).isEqualTo("1.23_1");
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
}
