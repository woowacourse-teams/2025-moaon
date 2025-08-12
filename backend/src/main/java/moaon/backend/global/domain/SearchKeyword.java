package moaon.backend.global.domain;

import java.util.regex.Pattern;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public record SearchKeyword(
        String value
) {

    public static final int MIN_LENGTH = 2;
    public static final int MAX_LENGTH = 50;
    private static final Pattern SPECIAL_CHARACTERS = Pattern.compile("[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s]");

    public SearchKeyword {
        if (value != null) {
            validateLength(value);
        }
    }

    public boolean hasValue() {
        return value != null && !value.isBlank();
    }

    public String replaceSpecialCharacters(String replacement) {
        return SPECIAL_CHARACTERS.matcher(value).replaceAll(replacement);
    }

    private void validateLength(String value) {
        int length = value.length();

        if (length < MIN_LENGTH || length > MAX_LENGTH) {
            throw new CustomException(ErrorCode.INVALID_SEARCH_KEYWORD_LENGTH);
        }
    }
}
