package moaon.backend.global.domain;

import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public record SearchKeyword(
        String value
) {

    public static final int MIN_LENGTH = 2;
    public static final int MAX_LENGTH = 50;

    public SearchKeyword {
        if (value != null) {
            validateLength(value);
        }
    }

    private void validateLength(String value) {
        int length = value.length();

        if (length < MIN_LENGTH || length > MAX_LENGTH) {
            throw new CustomException(ErrorCode.INVALID_SEARCH_KEYWORD_LENGTH);
        }
    }
}
