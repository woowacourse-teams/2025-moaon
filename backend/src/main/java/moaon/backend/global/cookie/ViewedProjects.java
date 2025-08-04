package moaon.backend.global.cookie;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class ViewedProjects {
    private static final int MAX_ENTRIES = 50;
    private static final int BLOCK_SECONDS = 1800; // 30분
    private static final int MAX_COOKIE_SIZE = 3500; // 쿠키 크기 제한 (3.5KB)
    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final Map<Long, Long> projectViewTimes;

    public static ViewedProjects from(String decoded) {
        Map<String, Long> viewedMap = parseJson(decoded);
        Map<Long, Long> result = convertKeysToLong(viewedMap);
        return new ViewedProjects(result);
    }

    private static Map<String, Long> parseJson(String decoded) {
        try {
            return objectMapper.readValue(decoded, new TypeReference<Map<String, Long>>() {});
        } catch (JsonProcessingException e) {
            return Collections.emptyMap();
        }
    }

    private static Map<Long, Long> convertKeysToLong(Map<String, Long> map) {
        Map<Long, Long> result = new HashMap<>();
        for (Map.Entry<String, Long> entry : map.entrySet()) {
            try {
                result.put(Long.parseLong(entry.getKey()), entry.getValue());
            } catch (NumberFormatException ex) {
                log.warn(""); //TODO 추후 로깅 컨벤션 merge 되면 컨벤션에 맞게 추가
            }
        }
        return result;
    }

    public static ViewedProjects empty() {
        return new ViewedProjects(new HashMap<>());
    }

    public void removeExpiredEntries(long currentTimeSeconds) {
        this.projectViewTimes.entrySet()
                .removeIf(entry -> currentTimeSeconds - entry.getValue() >= BLOCK_SECONDS);
    }

    public boolean isViewCountIncreasable(long projectId, long currentTimeSeconds) {
        Long lastViewTime = this.projectViewTimes.get(projectId);
        return lastViewTime == null || currentTimeSeconds - lastViewTime >= BLOCK_SECONDS;
    }

    public void add(long projectId, long currentTimeSeconds) {
        this.projectViewTimes.put(projectId, currentTimeSeconds);
    }

    public void removeUntilMaxSize() {
        while (this.projectViewTimes.size() > MAX_ENTRIES) {
            removeOldestEntry();
        }
    }

    public String serializeWithSizeLimit() {
        try {
            String json = objectMapper.writeValueAsString(this.projectViewTimes);
            while (json.length() > MAX_COOKIE_SIZE && !this.projectViewTimes.isEmpty()) {
                removeOldestEntry();
                json = objectMapper.writeValueAsString(this.projectViewTimes);
            }
            return json;
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public boolean isEmpty() {
        return this.projectViewTimes.isEmpty();
    }


    public boolean isInvalidForCookie(String json) {
        return json == null || this.projectViewTimes.isEmpty();
    }

    private void removeOldestEntry() {
        if (this.projectViewTimes.isEmpty()) {
            return;
        }
        Long oldestKey = Collections.min(this.projectViewTimes.entrySet(), Map.Entry.comparingByValue()).getKey();
        this.projectViewTimes.remove(oldestKey);
    }
}
