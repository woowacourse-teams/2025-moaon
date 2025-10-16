package moaon.backend.global.parser;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class URLParser {

    public static URL parse(String value) {
        try {
            return URI.create(value).toURL();
        } catch (MalformedURLException e) {
            throw new CustomException(ErrorCode.ARGUMENT_NOT_VALID, e);
        }
    }
}
