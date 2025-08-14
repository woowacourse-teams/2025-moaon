package moaon.backend.article.dto;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import moaon.backend.global.cursor.CreatedAtArticleCursor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CreatedAtArticleCursorTest {

    @DisplayName("nextCursor를 포맷팅한다.")
    @Test
    void getNextCursor() {
        // given
        CreatedAtArticleCursor cursor = new CreatedAtArticleCursor(LocalDateTime.of(2024, 7, 31, 10, 0), 1L);

        // when
        String nextCursor = cursor.getNextCursor();

        // then
        assertThat(nextCursor).isEqualTo("2024-07-31T10:00:00_1");
    }
}
