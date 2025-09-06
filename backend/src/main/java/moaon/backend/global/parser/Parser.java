package moaon.backend.global.parser;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public abstract class Parser<T> {

    public abstract T parse(String value);

    public static void validateValueEmpty(String value) {
        if (value == null || value.isEmpty()) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }
}
