package moaon.backend.global.parser;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class LocalDateTimeParser extends Parser<LocalDateTime> {

    @Override
    protected LocalDateTime doParse(String value) {
        try {
            return LocalDateTime.parse(value);
        } catch (DateTimeParseException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }
}
