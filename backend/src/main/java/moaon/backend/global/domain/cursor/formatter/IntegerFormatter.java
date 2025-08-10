package moaon.backend.global.domain.cursor.formatter;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class IntegerFormatter implements CursorFormatter<Integer> {
    @Override
    public Integer parseSortValue(String rawCursor) {
        try {
            String[] split = rawCursor.split("_");
            return Integer.parseInt(split[0]);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    @Override
    public String format(Integer sortValue, Long lastId) {
        return sortValue + "_" + lastId;
    }
}
