package moaon.backend.member.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.dto.UserInformation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GoogleOAuthClient {

    private static final String ACCESS_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String USER_INFORMATION_URL = "https://www.googleapis.com/userinfo/v2/me";

    @Value("${google.clientId:@null}")
    private String clientId;
    @Value("${google.clientSecret:@null}")
    private String clientSecret;
    @Value("${google.redirectUri:@null}")
    private String redirectUri;

    public UserInformation getUserInformation(String code) {
        GoogleAccessToken token = getGoogleAccessToken(code);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(USER_INFORMATION_URL))
                .header("Authorization", "Bearer " + token.access_token())
                .header("Accept", "application/json")
                .GET()
                .build();
        return getResponse(request, UserInformation.class);
    }

    private GoogleAccessToken getGoogleAccessToken(String code) {
        String body = "code=" + URLEncoder.encode(code, StandardCharsets.UTF_8)
                + "&client_id=" + URLEncoder.encode(clientId, StandardCharsets.UTF_8)
                + "&client_secret=" + URLEncoder.encode(clientSecret, StandardCharsets.UTF_8)
                + "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8)
                + "&grant_type=authorization_code";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(ACCESS_TOKEN_URL))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
        return getResponse(request, GoogleAccessToken.class);
    }

    private <T> T getResponse(HttpRequest request, Class<T> clazz) {
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
            validateStatusCode(response.statusCode());

            String body = response.body();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return objectMapper.readValue(body, clazz);
        } catch (IOException | InterruptedException e) {
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }

    private void validateStatusCode(int statusCode) {
        if (statusCode != 200) {
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }

    private record GoogleAccessToken(
            String access_token
    ) {
    }
}
