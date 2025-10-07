package moaon.backend.article.domain;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.openqa.selenium.By;

public class VelogContentFinder extends ContentFinder {
    /*
    벨로그가 사용중인 도메인: velog.io
    이 외 사용자 지정 도메인은 BodyFinder 가 수행한다.
     */

    @Override
    public boolean canHandle(String link) {
        try {
            URL url = new URL(link);
            String host = url.getHost();

            return host.endsWith("velog.io");
        } catch (MalformedURLException e) {
            return false;
        }
    }

    @Override
    protected List<By> getBy(String link) {
        return List.of(By.cssSelector("div.atom-one"));
    }

    @Override
    protected void validateLink(String link) {
        try {
            URL url = new URL(link);
            String[] parts = url.getPath().split("/");

            if (parts.length < 3) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }

            String username = parts[1].replaceFirst("@", "");
            String urlSlug = URLDecoder.decode(parts[2], StandardCharsets.UTF_8);

            String graphqlQuery = """
                    {
                      "query": "query($username: String!, $url_slug: String!) { post(username: $username, url_slug: $url_slug) { id title } }",
                      "variables": {
                        "username": "%s",
                        "url_slug": "%s"
                      }
                    }
                    """.formatted(username, urlSlug);

            HttpURLConnection connection = (HttpURLConnection) new URL("https://v2.velog.io/graphql").openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            try (OutputStream os = connection.getOutputStream()) {
                os.write(graphqlQuery.getBytes());
            }

            String responseJson = new String(connection.getInputStream().readAllBytes());
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);

            JsonNode postNode = root.path("data").path("post");
            if (postNode.isNull() || postNode.isMissingNode()) {
                throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
            }

        } catch (IOException e) {
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }
}
