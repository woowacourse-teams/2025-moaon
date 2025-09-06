package moaon.backend.global.parser;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class LongParser extends Parser<Long> {

    @Override
    public Long parse(String value) {
        return toLong(value);
    }

    public static Long toLong(String value) {
        validateValueEmpty(value);

        try {
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }
}
