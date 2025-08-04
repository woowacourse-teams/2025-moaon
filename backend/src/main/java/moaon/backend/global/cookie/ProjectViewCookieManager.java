package moaon.backend.global.cookie;

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

@Slf4j
public class ProjectViewCookieManager {

    private static final String COOKIE_NAME = "viewed_projects";
    private static final String COOKIE_PATH = "/projects";

    public ViewedProjects extractViewedMap(HttpServletRequest request) {
        Cookie cookie = getCookie(request);
        if (cookie == null) {
            return ViewedProjects.empty();
        }
        String decoded = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);

        ViewedProjects viewedProjects = ViewedProjects.from(decoded);
        viewedProjects.removeExpiredEntries(getCurrentTimeSeconds());
        return viewedProjects;
    }

    public boolean isViewCountIncreasable(long projectId, ViewedProjects viewedProjects) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        return viewedProjects.isViewCountIncreasable(projectId, currentTimeSeconds);
    }

    public Cookie createOrUpdateCookie(long projectId, ViewedProjects viewedProjects) {
        if (viewedProjects.isEmpty()) {
            return createCookie(projectId, viewedProjects);
        }
        return updateCookie(projectId, viewedProjects);
    }

    private Cookie createCookie(long projectId, ViewedProjects viewedProjects) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        viewedProjects.add(projectId, currentTimeSeconds);
        return buildValidCookie(viewedProjects, secondsUntilMidnight);
    }

    private Cookie updateCookie(long projectId, ViewedProjects viewedProjects) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        viewedProjects.removeExpiredEntries(currentTimeSeconds);
        viewedProjects.add(projectId, currentTimeSeconds);
        viewedProjects.removeUntilMaxSize();
        return buildValidCookie(viewedProjects, secondsUntilMidnight);
    }

    private Cookie buildValidCookie(ViewedProjects viewedProjects, long secondsUntilMidnight) {
        String json = viewedProjects.serializeWithSizeLimit();
        if (viewedProjects.isInvalidForCookie(json)) {
            return createEmptyCookie();
        }
        return buildCookieFromJson(json, secondsUntilMidnight);
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

    private Cookie createEmptyCookie() {
        Cookie cookie = new Cookie(COOKIE_NAME, "");
        cookie.setPath(COOKIE_PATH);
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
                filter(cookie -> cookie.getName().equals(COOKIE_NAME))
                .findFirst()
                .orElse(null);
    }
}