package moaon.backend.global.parser;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class IntegerParser {

    public static Integer toInt(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_CURSOR_FORMAT);
        }
    }
}
