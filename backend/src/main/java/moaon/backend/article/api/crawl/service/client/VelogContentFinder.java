package moaon.backend.article.api.crawl.service.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import moaon.backend.article.api.crawl.dto.FinderCrawlResult;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class VelogContentFinder extends ContentFinder {

    private final int connectionTimeoutSeconds;
    private final int readTimeoutSeconds;

    public VelogContentFinder(int connectionTimeoutSec, int readTimeoutSec) {
        this.connectionTimeoutSeconds = connectionTimeoutSec;
        this.readTimeoutSeconds = readTimeoutSec;
    }

    /*
            벨로그가 사용중인 도메인: velog.io
            이 외 사용자 지정 도메인은 BodyFinder 가 수행한다.
             */
    @Override
    public FinderCrawlResult crawl(URL url) {
        JsonNode post = getPost(url);
        String title = post.path("title").asText();

        String content = post.path("body").asText();

        return new FinderCrawlResult(title, content);
    }

    private JsonNode getPost(URL url) {
        try {
            String[] parts = url.getPath().split("/");

            if (parts.length < 3) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }

            String username = parts[1].replaceFirst("@", "");
            String urlSlug = URLDecoder.decode(parts[2], StandardCharsets.UTF_8);

            String graphqlQuery = """
                    {
                      "query":"query ReadPost($username: String, $url_slug: String) { post(username: $username, url_slug: $url_slug) { title body } }",
                      "operationName":"ReadPost",
                      "variables": {
                        "username": "%s",
                        "url_slug": "%s"
                      }
                    }
                    """.formatted(username, urlSlug);

            HttpURLConnection connection = (HttpURLConnection) URI.create("https://v2.velog.io/graphql").toURL()
                    .openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(connectionTimeoutSeconds * 1_000);
            connection.setReadTimeout(readTimeoutSeconds * 1_000);
            connection.setDoOutput(true);

            try (OutputStream os = connection.getOutputStream()) {
                os.write(graphqlQuery.getBytes(StandardCharsets.UTF_8));
            }

            try (InputStream inputStream = connection.getInputStream()) {
                String responseJson = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(responseJson);

                JsonNode postNode = root.path("data").path("post");
                if (postNode.isNull() || postNode.isMissingNode()) {
                    throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
                }
                return postNode;
            } finally {
                connection.disconnect();
            }
        } catch (IOException e) {
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_FAILED);
        }
    }

    @Override
    public boolean canHandle(URL url) {
        String host = url.getHost();
        return host.endsWith("velog.io");
    }
}
