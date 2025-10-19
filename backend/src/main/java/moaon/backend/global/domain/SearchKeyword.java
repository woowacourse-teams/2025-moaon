package moaon.backend.global.domain;

import java.util.regex.Pattern;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public record SearchKeyword(
        String value
) {

    private static final int MAX_LENGTH = 50;

    private static final Pattern SPECIAL_CHARACTERS = Pattern.compile("[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s]");

    public SearchKeyword {
        if (value != null && value.length() > MAX_LENGTH) {
            throw new CustomException(ErrorCode.INVALID_SEARCH_KEYWORD_LENGTH);
        }
    }

    public boolean hasValue() {
        return value != null && !value.isBlank();
    }

    public String replaceSpecialCharacters(String replacement) {
        if (value == null) {
            throw new IllegalArgumentException("검색어가 비어있습니다.");
        }
        return SPECIAL_CHARACTERS.matcher(value).replaceAll(replacement);
    }

    public static int getMaxLength() {
        return MAX_LENGTH;
    }
}
