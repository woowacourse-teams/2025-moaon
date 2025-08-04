package moaon.backend.global.cookie;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class ProjectViewCookieManager {

    private static final String COOKIE_NAME = "viewed_projects";
    private static final String COOKIE_PATH = "/projects";
    private static final int MAX_ENTRIES = 50;
    private static final int BLOCK_SECONDS = 1800; // 30분
    private static final int MAX_COOKIE_SIZE = 3500; // 쿠키 크기 제한 (3.5KB)

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<Long, Long> extractViewedMap(HttpServletRequest request) {
        Cookie cookie = getCookie(request);
        if (cookie == null) {
            return new HashMap<>();
        }
        Map<String, Long> parsedCookieMap = decodeAndParseCookie(cookie);
        Map<Long, Long> convertedMap = convertKeyToLong(parsedCookieMap);
        removeExpiredEntries(convertedMap);
        return convertedMap;
    }

    public boolean isViewCountIncreasable(long projectId, Map<Long, Long> viewedMap) {
        Long lastViewTime = viewedMap.get(projectId);
        long currentTimeSeconds = getCurrentTimeSeconds();
        return lastViewTime == null || currentTimeSeconds - lastViewTime >= BLOCK_SECONDS;
    }

    public Cookie createOrUpdateCookie(long projectId, Map<Long, Long> viewedMap) {
        if (viewedMap == null || viewedMap.isEmpty()) {
            return createCookie(projectId, new HashMap<>());
        }
        return updateCookie(projectId, viewedMap);
    }

    private Cookie createCookie(long projectId, Map<Long, Long> viewedMap) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        viewedMap.put(projectId, currentTimeSeconds);

        return buildValidCookie(viewedMap, secondsUntilMidnight);
    }

    private Cookie updateCookie(long projectId, Map<Long, Long> viewedMap) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        removeExpiredEntries(viewedMap);
        viewedMap.put(projectId, currentTimeSeconds);

        while (viewedMap.size() > MAX_ENTRIES) {
            removeOldestEntry(viewedMap);
        }

        return buildValidCookie(viewedMap, secondsUntilMidnight);
    }

    private Cookie buildValidCookie(Map<Long, Long> viewedMap, long secondsUntilMidnight) {
        String json = serializeWithSizeLimit(viewedMap);
        if (isInvalidForCookie(viewedMap, json)) {
            return createEmptyCookie();
        }
        return buildCookieFromJson(json, secondsUntilMidnight);
    }

    private Map<String, Long> decodeAndParseCookie(Cookie cookie) {
        try {
            String decoded = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);
            return objectMapper.readValue(decoded, new TypeReference<Map<String, Long>>() {
            });
        } catch (JsonProcessingException e) {
            return new HashMap<>();
        }
    }

    private Map<Long, Long> convertKeyToLong(Map<String, Long> map) {
        Map<Long, Long> result = new HashMap<>();
        for (Map.Entry<String, Long> entry : map.entrySet()) {
            try {
                result.put(Long.parseLong(entry.getKey()), entry.getValue());
            } catch (NumberFormatException ex) {
                log.warn(""); //TODO 추후 로깅 머지되면 로깅컨벤션에 맞춰서 로그 내용 수정
            }
        }
        return result;
    }

    private long getCurrentTimeSeconds() {
        return System.currentTimeMillis() / 1000;
    }

    private long getSecondsUntilMidnight(long currentTimeSeconds) {
        ZonedDateTime nowKST = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        ZonedDateTime tomorrowMidnight = nowKST.plusDays(1).truncatedTo(ChronoUnit.DAYS);
        long koreaMidnightTimestamp = tomorrowMidnight.toEpochSecond();
        return koreaMidnightTimestamp - currentTimeSeconds;
    }

    private void removeExpiredEntries(Map<Long, Long> viewedMap) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        viewedMap.entrySet().removeIf(entry -> currentTimeSeconds - entry.getValue() >= BLOCK_SECONDS);
    }

    private void removeOldestEntry(Map<Long, Long> viewedMap) {
        if (viewedMap.isEmpty()) {
            return;
        }
        Long oldestKey = Collections.min(viewedMap.entrySet(), Map.Entry.comparingByValue()).getKey();
        viewedMap.remove(oldestKey);
    }

    private String serializeWithSizeLimit(Map<Long, Long> viewedMap) {
        try {
            String json = objectMapper.writeValueAsString(viewedMap);
            while (json.length() > MAX_COOKIE_SIZE && !viewedMap.isEmpty()) {
                removeOldestEntry(viewedMap);
                json = objectMapper.writeValueAsString(viewedMap);
            }
            return json;
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private Cookie buildCookieFromJson(String json, long secondsUntilMidnight) {
        String encoded = URLEncoder.encode(json, StandardCharsets.UTF_8);
        Cookie cookie = new Cookie(COOKIE_NAME, encoded);
        cookie.setPath(COOKIE_PATH);
        cookie.setMaxAge((int) secondsUntilMidnight);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    private boolean isInvalidForCookie(Map<Long, Long> viewedMap, String json) {
        return json == null || viewedMap.isEmpty();
    }

    private Cookie createEmptyCookie() {
        Cookie cookie = new Cookie(COOKIE_NAME, "");
        cookie.setPath(COOKIE_PATH);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    private Cookie getCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }
        return Arrays.stream(request.getCookies()).
                filter(cookie -> cookie.getName().equals(COOKIE_NAME))
                .findFirst()
                .orElse(null);
    }
}