package moaon.backend.global.parser;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Pattern;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class URLParser {

    private static final Pattern URL_PATTERN = Pattern.compile(
            "^(https?://)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(:\\d+)?(/[^\\s]*)?(\\?[^\\s]*)?$",
            Pattern.CASE_INSENSITIVE
    );

    public static URL parse(String value) {
        if (!URL_PATTERN.matcher(value).matches()) {
            throw new CustomException(ErrorCode.ARGUMENT_NOT_VALID);
        }

        try {
            return new URL(value);
        } catch (MalformedURLException e) {
            throw new CustomException(ErrorCode.ARGUMENT_NOT_VALID, e);
        }
    }
}
