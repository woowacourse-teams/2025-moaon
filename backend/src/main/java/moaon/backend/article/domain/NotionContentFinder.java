package moaon.backend.article.domain;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.openqa.selenium.By;

public class NotionContentFinder extends ContentFinder {
    /*
    노션이 사용중인 도메인: notion.site, notion.com, notion.so
    이 외 사용자 지정 도메인은 bodyFinder 가 수행한다.
     */

    private final List<String> notionDomain = List.of(
            "notion.site", "notion.com", "notion.so"
    );

    @Override
    public boolean canHandle(String link) {
        try {
            URL url = new URL(link);
            String host = url.getHost();

            return notionDomain.stream().anyMatch(host::endsWith);
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
        String pageId = extractPageId(url);
        String apiUrl = "https://www.notion.so/api/v3/loadPageChunk";

        String payload = String.format(
                "{\"pageId\":\"%s\",\"chunkNumber\":0,\"limit\":50,\"verticalColumns\":false,\"cursor\":{\"stack\":[]},\"cacheNotionViewData\":true,\"locale\":\"en\"}",
                pageId
        );

        try {
            HttpRequest request = HttpRequest.newBuilder(URI.create(apiUrl))
                    .POST(HttpRequest.BodyPublishers.ofString(payload))
                    .header("Content-Type", "application/json")
                    .header("User-Agent", "Mozilla/5.0")
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());

            // JSON 구조 기반 검증
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response.body());

            // recordMap 기반 검증 (가장 신뢰성 높음)
            JsonNode recordMap = rootNode.path("recordMap");
            System.out.println("recordMap.size() = " + recordMap.size());
            System.out.println("recordMap.isMissingNode() = " + recordMap.isMissingNode());
            if (recordMap.isMissingNode() ||
                    (recordMap.size() == 1 && recordMap.has("__version__"))) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }

        } catch (IOException | InterruptedException e) {
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }

    private String extractPageId(String url) {
        try {
            URL u = new URL(url);
            String path = u.getPath(); // /페이지제목-페이지ID or /페이지ID
            String lastSegment = path.substring(path.lastIndexOf('/') + 1);

            // 쿼리 파라미터 제거
            if (lastSegment.contains("?")) {
                lastSegment = lastSegment.substring(0, lastSegment.indexOf('?'));
            }

            // 하이픈 뒤 ID 있는 경우
            int lastHyphen = lastSegment.lastIndexOf('-');
            String candidateId = (lastHyphen != -1)
                    ? lastSegment.substring(lastHyphen + 1)
                    : lastSegment;

            candidateId = candidateId.replaceAll("[^0-9a-fA-F]", "");

            if (candidateId.length() >= 32) {
                return candidateId.length() > 32 ? candidateId.substring(0, 32) : candidateId;
            }

            throw new IllegalArgumentException("Invalid Notion page ID in link: " + url);
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Invalid URL format: " + url);
        }
    }
}
