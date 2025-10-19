package moaon.backend.global.domain;

import java.util.List;
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

    public boolean hasOnlyOneToken() {
        return hasValue() && allTokens().size() == 1;
    }

    public String lastToken() {
        return allTokens().getLast();
    }

    public List<String> allTokensBeforeLastToken() {
        assumeValueNotNull();

        int size = allTokens().size();
        return allTokens().subList(0, size - 1);
    }

    private List<String> allTokens() {
        assumeValueNotNull();

        String[] split = value.trim().split("\\s+");
        return List.of(split);
    }

    public String replaceSpecialCharacters(String replacement) {
        assumeValueNotNull();
        return SPECIAL_CHARACTERS.matcher(value).replaceAll(replacement);
    }

    public static int getMaxLength() {
        return MAX_LENGTH;
    }

    private void assumeValueNotNull() {
        if (!hasValue()) {
            throw new IllegalArgumentException("검색어가 비어있습니다.");
        }
    }
}
