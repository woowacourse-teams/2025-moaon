package moaon.backend.article.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import moaon.backend.article.domain.ArticleSortBy;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CursorParserTest {

    @DisplayName("마지막 날짜와 마지막 아이디를 바탕으로 CreatedAtCursor 를 만든다.")
    @Test
    void toCreatedAtCursor() {
        // given
        String cursor = "2024-07-31T10:00:00_12345";
        ArticleSortBy sortBy = ArticleSortBy.CREATED_AT;

        // when
        Cursor<?> actual = CursorParser.toCursor(cursor, sortBy);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(CreatedAtCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(LocalDateTime.of(2024, 7, 31, 10, 0))
        );
    }

    @DisplayName("마지막 클릭수와 마지막 아이디를 바탕으로 ClickCursor 를 만든다.")
    @Test
    void toClickCursor() {
        // given
        String cursor = "1500_12345";
        ArticleSortBy sortBy = ArticleSortBy.CLICKS;

        // when
        Cursor<?> actual = CursorParser.toCursor(cursor, sortBy);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(ClickCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(1500)
        );
    }

}
