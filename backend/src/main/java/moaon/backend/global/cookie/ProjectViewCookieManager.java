package moaon.backend.global.cookie;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class ProjectViewCookieManager {

    private static final Logger logger = LoggerFactory.getLogger(ProjectViewCookieManager.class);

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
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);
        updateViewedMap(projectId, viewedMap, currentTimeSeconds);

        String json = serializeWithSizeLimit(viewedMap);
        if (isInvalidForCookie(viewedMap, json)) {
            return createEmptyCookie();
        }
        return buildCookieFromJson(json, secondsUntilMidnight);
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

    private Map<String, Long> decodeAndParseCookie(Cookie cookie) {
        try {
            String decoded = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);
            return objectMapper.readValue(decoded, new TypeReference<Map<String, Long>>() {
            });
        } catch (Exception e) {
            return new HashMap<>();
        }
    }

    private Map<Long, Long> convertKeyToLong(Map<String, Long> map) {
        return map.entrySet()
                .stream()
                .collect(Collectors.toMap(
                        e -> Long.parseLong(e.getKey()),
                        Map.Entry::getValue
                ));
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

    private void updateViewedMap(long projectId, Map<Long, Long> viewedMap, long currentTimeSeconds) {
        removeExpiredEntries(viewedMap);
        viewedMap.put(projectId, currentTimeSeconds);

        while (viewedMap.size() > MAX_ENTRIES) {
            removeOldestEntry(viewedMap);
        }
    }

    private String serializeWithSizeLimit(Map<Long, Long> viewedMap) {
        try {
            String json = objectMapper.writeValueAsString(viewedMap);

            while (json.length() > MAX_COOKIE_SIZE && !viewedMap.isEmpty()) {
                removeOldestEntry(viewedMap);
                json = objectMapper.writeValueAsString(viewedMap);
            }
            return json;

        } catch (Exception e) {
            return null;
        }
    }

    private Cookie buildCookieFromJson(String json, long secondsUntilMidnight) {
        try {
            String encoded = URLEncoder.encode(json, StandardCharsets.UTF_8);
            Cookie cookie = new Cookie(COOKIE_NAME, encoded);
            cookie.setPath(COOKIE_PATH);
            cookie.setMaxAge((int) secondsUntilMidnight);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            return cookie;
        } catch (Exception e) {
            return createEmptyCookie();
        }
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
}