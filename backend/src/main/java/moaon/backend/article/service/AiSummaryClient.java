package moaon.backend.article.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.dto.FinderCrawlResult;
import moaon.backend.article.exception.AiNoCostException;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiSummaryClient {

    @Value("${gpt.api-key}")
    private String apiKey;
    private static final URI OPEN_ROUTER_URI = URI.create("https://openrouter.ai/api/v1/chat/completions");

    public ArticleCrawlResult summarize(FinderCrawlResult crawlResult, String model) {
        String title = crawlResult.title();
        String content = crawlResult.content();

        String systemPrompt = """
                당신은 엄격한 텍스트 요약 전문가입니다.
                
                **가장 중요한 제약:**
                **"summary"는 200자(공백 포함)를 절대로 넘겨서는 안 됩니다. 200자 초과는 오류로 간주됩니다.**
                
                응답은 반드시 JSON 객체로만 반환하며, 모든 내용은 한글로 작성해야 합니다.
                필드: {"summary": "..."}.
                
                **출력 규칙:**
                - 사고 과정/추론은 절대 금지하며, 최종 JSON만 간결히 출력하라.
                - "summary": 200자 이내의 상세 요약. 핵심, 문제/해결, 맥락 등을 구체적으로 포함. 200자를 초과하는 것은 금지.
                - 길이 제약 준수 및 내용의 구체성과 상세성을 모두 확보해야 합니다.
                - JSON 외 형식/설명/예시는 절대 포함하지 마십시오.
                """;

        String userContent = String.format("원본문: %s", content == null ? "" : content);

        ArrayList<Object> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", systemPrompt));
        messages.add(Map.of("role", "user", "content", userContent));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.2);
        requestBody.put("max_tokens", 500);

        ObjectMapper objectMapper = new ObjectMapper();

        try (
                HttpClient httpClient = HttpClient.newBuilder()
                        .connectTimeout(Duration.ofSeconds(10))
                        .build()
        ) {
            String requestJson = objectMapper.writeValueAsString(requestBody);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(OPEN_ROUTER_URI)
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("User-Agent", "Moaon/1.0 (http://localhost:8080)")
                    .POST(BodyPublishers.ofString(requestJson))
                    .build();

            HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
            String body = response.body();
            System.out.println("body = " + body);

            if (response.statusCode() == 403) {
                throw new AiNoCostException();
            }

            JsonNode root = objectMapper.readTree(body);
            JsonNode contentNode = root.path("choices").get(0).path("message").path("content");

            JsonNode parsed = objectMapper.readTree(contentNode.asText());
            String summary = parsed.get("summary").asText("");
            
            summary = enforceLength(summary, 0, 255);

            return new ArticleCrawlResult(title, summary, content);
        } catch (IOException | InterruptedException e) {
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_FAILED, e);
        }
    }

    private String enforceLength(String text, int min, int max) {
        if (text == null) {
            return "";
        }
        text = text.strip();
        if (text.length() <= max) {
            return text;
        }

        int lastSentenceEnd = text.lastIndexOf(".", max);
        if (lastSentenceEnd > min) {
            return text.substring(0, lastSentenceEnd + 1);
        }

        return text.substring(0, max);
    }
}
