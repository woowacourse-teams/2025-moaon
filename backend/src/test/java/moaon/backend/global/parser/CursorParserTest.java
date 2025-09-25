package moaon.backend.global.parser;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import moaon.backend.project.domain.ProjectSortType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class CursorParserTest {

    @DisplayName("cursor 형식을 검증한다.")
    @Test
    void cursorParse() {
        // given
        String cursor1 = "2025-09-25T04:35:00.764_35867";
        String cursor2 = "2025-09-25T04:35:00_35867";
        String cursor3 = "2025-09-25T12:13:36.146232141_35867";
        ProjectSortType createdAt = ProjectSortType.CREATED_AT;

        // when - then
        assertAll(
                () -> assertDoesNotThrow(() -> createdAt.toCursor(cursor1)),
                () -> assertDoesNotThrow(() -> createdAt.toCursor(cursor2)),
                () -> assertDoesNotThrow(() -> createdAt.toCursor(cursor3))
        );
    }
}
