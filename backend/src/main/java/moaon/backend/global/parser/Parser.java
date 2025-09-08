package moaon.backend.global.parser;

import java.time.format.DateTimeParseException;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public abstract class Parser<T> {

    public final T parse(String value) {
        validateValueEmpty(value);

        try {
            return doParse(value);
        } catch (NumberFormatException | DateTimeParseException e) {
            throw invalidFormat();
        }
    }

    private CustomException invalidFormat() {
        return new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
    }

    private void validateValueEmpty(String value) {
        if (value == null || value.isEmpty()) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }

    protected abstract T doParse(String value);
}
