package moaon.backend.project.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import moaon.backend.global.cursor.CreatedAtProjectCursor;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.cursor.LoveProjectCursor;
import moaon.backend.global.cursor.ViewProjectCursor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class ProjectSortTypeTest {

    @DisplayName("정렬 기준을 받아서 SortBy를 반환한다.")
    @ParameterizedTest()
    @CsvSource({"createdAt,CREATED_AT", "views,VIEWS", "loves,LOVES", "createdat,CREATED_AT", ",CREATED_AT"})
    void from(String sortType, ProjectSortType expected) {
        //when
        ProjectSortType actual = ProjectSortType.from(sortType);

        //then
        assertThat(actual).isEqualTo(expected);
    }

    @DisplayName("CreatedAtProjectCursor 를 만든다.")
    @Test
    void toCreatedAtProjectCursor() {
        // given
        String cursor = "2024-07-31T10:00:00_12345";
        ProjectSortType sortBy = ProjectSortType.CREATED_AT;

        // when
        Cursor<?> actual = sortBy.toCursor(cursor);

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
        Cursor<?> actual = sortBy.toCursor(cursor);

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
        Cursor<?> actual = sortBy.toCursor(cursor);

        // then
        assertAll(
                () -> assertThat(actual).isInstanceOf(ViewProjectCursor.class),
                () -> assertThat(actual.getLastId()).isEqualTo(12345),
                () -> assertThat(actual.getSortValue()).isEqualTo(1500)
        );
    }
}
