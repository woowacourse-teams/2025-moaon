package moaon.backend.article.domain;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.openqa.selenium.By;

public class TistoryContentFinder extends ContentFinder {
    /*
    티스토리가 사용중인 도메인 주소: tistory.com
    이 외 사용자 지정 도메인 주소는 BodyFinder 가 수행한다.
     */

    @Override
    public boolean canHandle(String link) {
        try {
            URL url = new URL(link);
            String host = url.getHost();

            return host.endsWith("tistory.com");
        } catch (MalformedURLException e) {
            return false;
        }
    }

    @Override
    protected List<By> getBy(String link) {
        return List.of(By.cssSelector("div.contents_style"), By.cssSelector("div.content_style"));
    }

    @Override
    protected void validateLink(String link) {
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(link).openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            int code = connection.getResponseCode();
            if (code == 403) {
                throw new CustomException(ErrorCode.ARTICLE_URL_FORBIDDEN);
            }
            if (code == 404) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }
            if (code == 410) {
                throw new CustomException(ErrorCode.ARTICLE_URL_GONE);
            }

        } catch (IOException e) {
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }
}
