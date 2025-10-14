package moaon.backend.article.domain;

import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.URLDecoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class NotionContentFinder extends ContentFinder {
    /*
    노션이 사용중인 도메인: notion.site, notion.com, notion.so
    이 외 사용자 지정 도메인은 bodyFinder 가 수행한다.
     */

    @Value("${notion.user_id}")
    private String notionUserId;
    @Value("${notion.tokenV2}")
    private String tokenV2;

    private static final List<String> NOTION_DOMAIN = List.of(
            "notion.site", "notion.com", "notion.so"
    );

    @Override
    public boolean canHandle(String link) {
        try {
            URL url = URI.create(link).toURL();
            String host = url.getHost();

            return NOTION_DOMAIN.stream().anyMatch(host::endsWith);
        } catch (MalformedURLException e) {
            return false;
        }
    }

    @Override
    public ArticleCrawlResponse crawl(String link) {
        String responseBody = getResponseBody(link);
        validateLink(responseBody);

        String title = getTitle(responseBody);

        String body = getText(link);
        int lastIndex = Math.min(body.length(), 255);
        String summary = body.substring(0, lastIndex);

        return new ArticleCrawlResponse(title, summary);
    }

    public String getText(String link) {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get(link);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            List<By> bys = List.of(By.className("notion-page-content"));
            for (By by : bys) {
                try {
                    WebElement webElement = wait.until(presenceOfElementLocated(by));
                    return webElement.getText().trim();
                } catch (TimeoutException | NoSuchElementException e) {
                    throw new CustomException(ErrorCode.UNKNOWN, e);
                }
            }

            throw new CustomException(ErrorCode.UNKNOWN);
        } finally {
            driver.quit();
        }
    }

    private String getTitle(String responseBody) {
        Pattern pattern = Pattern.compile("\"title\"\\s*:\\s*\\[\\s*\\[\\s*\"(.*?)\"\\s*\\]\\s*\\]");
        Matcher matcher = pattern.matcher(responseBody);
        if (matcher.find()) {
            return matcher.group(1);
        }

        throw new CustomException(ErrorCode.UNKNOWN);
    }

    private void validateLink(String responseBody) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            JsonNode recordMap = mapper.readTree(responseBody).path("recordMap");

            // recordMap 에 아무런 정보가 없는 상황입니다.
            if (recordMap.isMissingNode() || recordMap.isEmpty()) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }

            // recordMap 에 버전 정보만 있는 상황입니다.
            if (recordMap.size() == 1 && recordMap.has("__version__")) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }

        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.UNKNOWN, e);
        }
    }

    private String getResponseBody(String url) {
        String pageId = extractPageId(url);
        String decodedToken = URLDecoder.decode(tokenV2, StandardCharsets.UTF_8);

        String notionInternalApiUrl = "https://www.notion.so/api/v3/loadPageChunk";

        /*
        verticalColumns 가 페이지 레이아웃 관련 옵션이라는대, 꼭 있어야 api 가 성공하네요..?
        내부 api 라 이유는 잘 모르곘습니다.
         */
        String payload = String.format("""
                {
                  "pageId": "%s",
                  "verticalColumns": true
                }
                """, pageId);

        /*
        노션은 token, notionId 만 있다고 해서 정상적인 접근으로 보지 않는다.
        만약 여기서 200 OK 가 나오지 않는다면, 애초에 요청이 잘못 됐다는 뜻이다.
         */
        HttpRequest request = HttpRequest.newBuilder(URI.create(notionInternalApiUrl))
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .header("Content-Type", "application/json")
                .header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)")
                .header("cookie", "token_v2=" + decodedToken + "; notion_user_id=" + notionUserId)
                .build();

        try {
            return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString()).body();
        } catch (IOException | InterruptedException e) {
            throw new CustomException(ErrorCode.UNKNOWN, e);
        }
    }

    /*
    https://developers.notion.com/reference/intro
    노션 공식문서에 따르면
    The URL ends in a page ID. It should be a 32 character long string. 라고 명시되어 있습니다.
    따라서 query, fragment 만 제거한 후 마지막 32자를 pageId 로 추출합니다.
     */
    private String extractPageId(String link) {
        try {
            String path = URI.create(link).toURL().getPath();

            String lastSegment = path.substring(path.indexOf('/') + 1);
            if (lastSegment.contains("?")) {
                lastSegment = lastSegment.substring(0, lastSegment.indexOf('?'));
            }
            if (lastSegment.contains("#")) {
                lastSegment = lastSegment.substring(0, lastSegment.indexOf('#'));
            }

            String pageId = lastSegment.substring(lastSegment.length() - 32);

            return String.format("%s-%s-%s-%s-%s",
                    pageId.substring(0, 8),
                    pageId.substring(8, 12),
                    pageId.substring(12, 16),
                    pageId.substring(16, 20),
                    pageId.substring(20)
            );
        } catch (MalformedURLException e) {
            throw new CustomException(ErrorCode.UNKNOWN, e);
        }
    }
}
