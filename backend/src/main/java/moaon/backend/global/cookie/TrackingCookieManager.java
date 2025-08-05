package moaon.backend.global.cookie;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class TrackingCookieManager {

    private final String cookieName;
    private final String cookiePath;

    public AccessHistory extractViewedMap(HttpServletRequest request) {
        Cookie cookie = getCookie(request);
        if (cookie == null) {
            return AccessHistory.empty();
        }
        String decodedCookieValue = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);

        AccessHistory accessHistory = AccessHistory.from(decodedCookieValue);
        accessHistory.removeExpiredEntries(getCurrentTimeSeconds());
        return accessHistory;
    }

    public boolean isCountIncreasable(long projectId, AccessHistory accessHistory) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        return accessHistory.isCountIncreasable(projectId, currentTimeSeconds);
    }

    public Cookie createOrUpdateCookie(long projectId, AccessHistory accessHistory) {
        if (accessHistory.isEmpty()) {
            return createCookie(projectId, accessHistory);
        }
        return updateCookie(projectId, accessHistory);
    }

    private Cookie createCookie(long projectId, AccessHistory accessHistory) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        accessHistory.add(projectId, currentTimeSeconds);
        return buildValidCookie(accessHistory, secondsUntilMidnight);
    }

    private Cookie updateCookie(long projectId, AccessHistory accessHistory) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        accessHistory.removeExpiredEntries(currentTimeSeconds);
        accessHistory.add(projectId, currentTimeSeconds);
        accessHistory.removeUntilMaxSize();
        return buildValidCookie(accessHistory, secondsUntilMidnight);
    }

    private Cookie buildValidCookie(AccessHistory accessHistory, long secondsUntilMidnight) {
        String json = accessHistory.serializeWithSizeLimit();
        if (accessHistory.isInvalidForCookie(json)) {
            return createEmptyCookie();
        }
        return buildCookieFromJson(json, secondsUntilMidnight);
    }

    private Cookie buildCookieFromJson(String json, long secondsUntilMidnight) {
        String encoded = URLEncoder.encode(json, StandardCharsets.UTF_8);
        Cookie cookie = new Cookie(cookieName, encoded);
        cookie.setPath(cookiePath);
        cookie.setMaxAge((int) secondsUntilMidnight);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    private Cookie createEmptyCookie() {
        Cookie cookie = new Cookie(cookieName, "");
        cookie.setPath(cookiePath);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
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

    private Cookie getCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }
        return Arrays.stream(request.getCookies()).
                filter(cookie -> cookie.getName().equals(cookieName))
                .findFirst()
                .orElse(null);
    }
}
