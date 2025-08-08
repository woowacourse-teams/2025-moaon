package moaon.backend.global.cookie;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;

@RequiredArgsConstructor
@Slf4j
public class TrackingCookieManager {

    private static final String NONE = "None";
    private static final String SET_COOKIE_HEADER = "Set-Cookie";

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

    public boolean isCountIncreasable(long contentId, AccessHistory accessHistory) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        return accessHistory.isCountIncreasable(contentId, currentTimeSeconds);
    }

    public void createOrUpdateCookie(
            long contentId,
            AccessHistory accessHistory,
            HttpServletResponse response
    ) {
        if (accessHistory.isEmpty()) {
            createCookie(contentId, accessHistory, response);
        }
        updateCookie(contentId, accessHistory, response);
    }

    private void createCookie(
            long contentId,
            AccessHistory accessHistory,
            HttpServletResponse response
    ) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        accessHistory.add(contentId, currentTimeSeconds);
        buildAndSetCookie(accessHistory, secondsUntilMidnight, response);
    }

    private void updateCookie(
            long contentId,
            AccessHistory accessHistory,
            HttpServletResponse response
    ) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        accessHistory.removeExpiredEntries(currentTimeSeconds);
        accessHistory.add(contentId, currentTimeSeconds);
        accessHistory.removeUntilMaxSize();
        buildAndSetCookie(accessHistory, secondsUntilMidnight, response);
    }

    private void buildAndSetCookie(
            AccessHistory accessHistory,
            long secondsUntilMidnight,
            HttpServletResponse response
    ) {
        String json = accessHistory.serializeWithSizeLimit();
        if (accessHistory.isInvalidForCookie(json)) {
            setEmptyCookie(response);
            return;
        }
        setCookieWithResponseCookie(json, secondsUntilMidnight, response);
    }

    private void setCookieWithResponseCookie(
            String json,
            long secondsUntilMidnight,
            HttpServletResponse response
    ) {
        String encoded = URLEncoder.encode(json, StandardCharsets.UTF_8);

        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(cookieName, encoded)
                .path(cookiePath)
                .maxAge(Duration.ofSeconds(secondsUntilMidnight))
                .httpOnly(true)
                .secure(true)
                .sameSite(NONE);

        ResponseCookie cookie = builder.build();
        response.addHeader(SET_COOKIE_HEADER, cookie.toString());
    }

    private void setEmptyCookie(HttpServletResponse response) {
        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(cookieName, "")
                .path(cookiePath)
                .maxAge(Duration.ZERO)
                .httpOnly(true)
                .secure(true)
                .sameSite(NONE);

        ResponseCookie cookie = builder.build();
        response.addHeader(SET_COOKIE_HEADER, cookie.toString());
    }

    private long getCurrentTimeSeconds() {
        return System.currentTimeMillis() / 1000;
    }

    private long getSecondsUntilMidnight(long currentTimeSeconds) {
        ZonedDateTime nowKST = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        ZonedDateTime tomorrowMidnight = nowKST
                .plusDays(1)
                .truncatedTo(ChronoUnit.DAYS)
                .plusHours(4);
        long koreaMidnightTimestamp = tomorrowMidnight.toEpochSecond();
        return koreaMidnightTimestamp - currentTimeSeconds;
    }

    private Cookie getCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findFirst()
                .orElse(null);
    }
}
