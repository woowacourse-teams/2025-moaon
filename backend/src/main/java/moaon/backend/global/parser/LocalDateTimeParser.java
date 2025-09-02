package moaon.backend.global.parser;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class LocalDateTimeParser {

    public static LocalDateTime toLocalDateTime(String value) {
        if (value == null || value.isEmpty()) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }

        try {
            return LocalDateTime.parse(value);
        } catch (DateTimeParseException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }
}
