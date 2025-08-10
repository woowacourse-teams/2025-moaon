package moaon.backend.global.domain.cursor.formatter;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public interface CursorFormatter<T extends Comparable<? super T>> {

    T parseSortValue(String rawCursor);

    default Long parseLastId(String rawCursor) {
        try {
            return Long.parseLong(rawCursor.split("_")[1]);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    String format(T sortValue, Long lastId);
}
