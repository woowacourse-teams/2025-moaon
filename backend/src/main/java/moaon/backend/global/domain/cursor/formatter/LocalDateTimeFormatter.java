package moaon.backend.global.domain.cursor.formatter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class LocalDateTimeFormatter implements CursorFormatter<LocalDateTime> {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public LocalDateTime parseSortValue(String rawCursor) {
        try {
            String[] split = rawCursor.split("_");
            return LocalDateTime.parse(split[0], FORMATTER);
        } catch (DateTimeParseException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    @Override
    public String format(LocalDateTime sortValue, Long lastId) {
        return sortValue.format(FORMATTER) + "_" + lastId;
    }
}
