package moaon.backend.global.cookie;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class AccessHistory {

    private static final int MAX_ENTRIES = 50;
    private static final int BLOCK_SECONDS = 60 * 30;
    private static final int MAX_COOKIE_SIZE = (int) 3.5 * 1024;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final Map<Long, Long> accessTimes;

    public static AccessHistory from(String decodedCookieValue) {
        Map<String, Long> viewedMap = parseJson(decodedCookieValue);
        Map<Long, Long> result = convertKeysToLong(viewedMap);
        return new AccessHistory(result);
    }

    private static Map<String, Long> parseJson(String decodedCookieValue) {
        try {
            return objectMapper.readValue(decodedCookieValue, new TypeReference<Map<String, Long>>() {
            });
        } catch (JsonProcessingException e) {
            log.warn("[JsonProcessingException] JSON 변환에 실패했습니다. | Detail : {}", e.getMessage());
            return Collections.emptyMap();
        }
    }

    private static Map<Long, Long> convertKeysToLong(Map<String, Long> map) {
        Map<Long, Long> result = new HashMap<>();
        for (Entry<String, Long> entry : map.entrySet()) {
            try {
                result.put(Long.parseLong(entry.getKey()), entry.getValue());
            } catch (NumberFormatException ex) {
                log.warn("[NumberFormatException] {} 파싱을 실패했습니다. | Detail : {}", entry.getKey(), ex.getMessage());
            }
        }
        return result;
    }

    public static AccessHistory empty() {
        return new AccessHistory(new HashMap<>());
    }

    public void removeExpiredEntries(long currentTimeSeconds) {
        this.accessTimes.entrySet().removeIf(entry -> currentTimeSeconds - entry.getValue() >= BLOCK_SECONDS);
    }

    public boolean isCountIncreasable(long projectId, long currentTimeSeconds) {
        Long lastViewTime = this.accessTimes.get(projectId);
        return lastViewTime == null || currentTimeSeconds - lastViewTime >= BLOCK_SECONDS;
    }

    public void add(long projectId, long currentTimeSeconds) {
        this.accessTimes.put(projectId, currentTimeSeconds);
    }

    public void removeUntilMaxSize() {
        while (this.accessTimes.size() > MAX_ENTRIES) {
            removeOldestEntry();
        }
    }

    public String serializeWithSizeLimit() {
        try {
            String json = objectMapper.writeValueAsString(this.accessTimes);
            while (json.length() > MAX_COOKIE_SIZE && !this.accessTimes.isEmpty()) {
                removeOldestEntry();
                json = objectMapper.writeValueAsString(this.accessTimes);
            }
            return json;
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public boolean isEmpty() {
        return this.accessTimes.isEmpty();
    }


    public boolean isInvalidForCookie(String json) {
        return json == null || this.accessTimes.isEmpty();
    }

    private void removeOldestEntry() {
        if (this.accessTimes.isEmpty()) {
            return;
        }
        Long oldestKey = Collections.min(this.accessTimes.entrySet(), Map.Entry.comparingByValue()).getKey();
        this.accessTimes.remove(oldestKey);
    }
}
