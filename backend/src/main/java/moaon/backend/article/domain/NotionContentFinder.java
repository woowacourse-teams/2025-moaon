package moaon.backend.article.domain;

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
import java.util.List;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.openqa.selenium.By;

public class NotionContentFinder extends ContentFinder {
    /*
    노션이 사용중인 도메인: notion.site, notion.com, notion.so
    이 외 사용자 지정 도메인은 bodyFinder 가 수행한다.
     */

    private static final List<String> NOTION_DOMAIN = List.of(
            "notion.site", "notion.com", "notion.so"
    );

    @Override
    public boolean canHandle(String link) {
        try {
            URL url = new URL(link);
            String host = url.getHost();

            return NOTION_DOMAIN.stream().anyMatch(host::endsWith);
        } catch (MalformedURLException e) {
            return false;
        }
    }

    @Override
    protected List<By> getBy(String link) {
        return List.of(By.className("notion-page-content"));
    }

    @Override
    public void validateLink(String url) {
        /*
        노션은 token, notionUserId 가 없다면 잘못된 요청으로 인식
        무조건 넣어줘야 함.
        token 은 갱신이 된다. 1 ~ 2 주에 한 번씩 갱신을 해야 하는데, 어떻게 처리할지 생각해 봐야 할듯
         */
        String pageId = extractPageId(url);
        String tokenV2 = "v03%3AeyJhbGciOiJkaXIiLCJraWQiOiJwcm9kdWN0aW9uOnRva2VuLXYzOjIwMjQtMTEtMDciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..2XaShtLP2AyBCDniklwtWQ.ZI3yAobOmbpCKLu1xL9fImFfdBBwpiCJAZZgj_RzmaX7SkXcoLaNMxPQJeEg0H47LF4bHCT8MPj5uvcw6lvjMebYkibm3Ak94lLGdG9gFTj6oCsv6YSdc6zavoDcgM3S7oarvpB22tXXA2sWty1djvDWhgPxGhqbVhbOu-Ba-NyBgZGjGlohQa-GNPfEivQ3dZ9zYwEFs6gPP8p6hdDQAo3Oq4sEVoi_monMaau2nTCL0NCK1Bm4bPXZRIEQktC9FhUqlhgY1_Ttx1dznMCS206VOcpC9FmVYCIKJjX-n4RXxtnxbjtXVjbNPHd8Ij-V40UDxltyZqaUZvjly0ATminkS7KAiiZd2Ewc-LdKQ4w.Y3d1JaarG_3Rjv_OgyqA92pdAkbqZayo-MYp3rhbvvg";
        String notionUserId = "286d872b-594c-8161-896f-0002c9eb2837";
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
            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper mapper = new ObjectMapper();

            /*
            노션은 정상적인 접근에 대해서는 200 OK 를 반환한다.
            실질적인 정보는 recordMap 에 담아서 전달한다.
            권한이 없거나 삭제된 게시글에 대해서는 recordMap 에 버전 정보만 담거나, recordMap 에 아무런 정보가 없다.
             */

            JsonNode rootNode = mapper.readTree(response.body());
            JsonNode recordMap = rootNode.path("recordMap");

            // recordMap 에 아무런 정보가 없다면?
            if (recordMap.isMissingNode() || recordMap.isEmpty()) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }

            // recordMap 에 버전 정보만 있다면?
            if (recordMap.size() == 1 && recordMap.has("__version__")) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }
        } catch (IOException | InterruptedException e) {
            throw new CustomException(ErrorCode.UNKNOWN);
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
            String path = new URL(link).getPath();

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
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }
}
