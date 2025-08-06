package moaon.backend.article.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.global.cursor.ArticleCursor;
import moaon.backend.global.cursor.ClickArticleCursor;
import moaon.backend.global.cursor.CreatedAtArticleCursor;
import moaon.backend.global.cursor.CreatedAtProjectCursor;
import moaon.backend.global.cursor.CursorParser;
import moaon.backend.global.cursor.LoveProjectCursor;
import moaon.backend.global.cursor.ProjectCursor;
import moaon.backend.global.cursor.ViewProjectCursor;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.ProjectSortType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class CursorParserTest {

    @DisplayName("마지막 날짜와 마지막 아이디를 바탕으로 CreatedAtCursor 를 만든다.")
    @Test
    void toCreatedAtCursor() {
        // given
        String cursor = "2024-07-31T10:00:00_12345";
        ArticleSortType sortBy = ArticleSortType.CREATED_AT;

        // when
        ArticleCursor<?> actual = CursorParser.toCursor(cursor, sortBy);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(CreatedAtArticleCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(LocalDateTime.of(2024, 7, 31, 10, 0))
        );
    }

    @DisplayName("마지막 클릭수와 마지막 아이디를 바탕으로 ClickCursor 를 만든다.")
    @Test
    void toClickCursor() {
        // given
        String cursor = "1500_12345";
        ArticleSortType sortBy = ArticleSortType.CLICKS;

        // when
        ArticleCursor<?> actual = CursorParser.toCursor(cursor, sortBy);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(ClickArticleCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(1500)
        );
    }

    @DisplayName("cursor 가 없는 첫 페이지에서는 null 을 리턴한다.")
    @Test
    void toNull() {
        //given
        String cursor = "";

        //when
        ArticleCursor<?> actual = CursorParser.toCursor(cursor, ArticleSortType.CREATED_AT);

        // then
        assertThat(actual).isNull();
    }

    @DisplayName("잘못된 형식의 커서는 CustomException 을 발생시킨다.")
    @ParameterizedTest(name = "invalid cursor: {0}")
    @ValueSource(strings = {
            "2024-07-31_12345",
            "2024/07/31T10:00:00_12345",
            "2024-07-31T10:00:00",
            "abc_123",
            "12345",
            "2024-07-31T10:00:00_abc",
            "1500-123",
            "1500_",
            "_123",
            "1500_123_999",
            "2024-07-31T10:00:00_123_456",
            "20240731T100000_12345",
            "2024-07-31T10:00:00_12345 ",
            " 1500_12345"
    })
    void toCursorFail(String cursor) {
        assertThatThrownBy(() -> CursorParser.toCursor(cursor, ArticleSortType.CREATED_AT))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.INVALID_CURSOR_FORMAT.getMessage());
    }

    @DisplayName("정렬 기준과 Cursor 를 반대로 보내면 예외를 발생한다.")
    @Test
    void toClickCursorFail() {
        // given
        String clickCursor = "1500_12345";
        ArticleSortType createdAt = ArticleSortType.CREATED_AT;

        String createdAtCursor = "2024-07-31T10:00:00_12345";
        ArticleSortType clicks = ArticleSortType.CLICKS;

        // when
        assertAll(
                () -> assertThatThrownBy(() -> CursorParser.toCursor(clickCursor, createdAt))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.INVALID_CURSOR_FORMAT.getMessage()),

                () -> assertThatThrownBy(() -> CursorParser.toCursor(createdAtCursor, clicks))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.INVALID_CURSOR_FORMAT.getMessage())
        );
    }

    @DisplayName("CreatedAtProjectCursor 를 만든다.")
    @Test
    void toCreatedAtProjectCursor() {
        // given
        String cursor = "2024-07-31T10:00:00_12345";
        ProjectSortType sortBy = ProjectSortType.CREATED_AT;

        // when
        ProjectCursor<?> actual = CursorParser.toCursor(cursor, sortBy);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(CreatedAtProjectCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(LocalDateTime.of(2024, 7, 31, 10, 0))
        );
    }

    @DisplayName("CreatedAtProjectCursor 를 만든다.")
    @Test
    void toLoveProjectCursor() {
        // given
        String cursor = "1500_12345";
        ProjectSortType sortBy = ProjectSortType.LOVES;

        // when
        ProjectCursor<?> actual = CursorParser.toCursor(cursor, sortBy);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(LoveProjectCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(1500)
        );
    }

    @DisplayName("CreatedAtProjectCursor 를 만든다.")
    @Test
    void toViewProjectCursor() {
        // given
        String cursor = "1500_12345";
        ProjectSortType sortBy = ProjectSortType.VIEWS;

        // when
        ProjectCursor<?> actual = CursorParser.toCursor(cursor, sortBy);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(ViewProjectCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(1500)
        );
    }
}
