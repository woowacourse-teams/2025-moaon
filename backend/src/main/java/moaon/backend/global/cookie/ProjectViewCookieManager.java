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

    public ProjectViewTimes extractViewedMap(HttpServletRequest request) {
        Cookie cookie = getCookie(request);
        if (cookie == null) {
            return ProjectViewTimes.empty();
        }
        String decodedCookieValue = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);

        ProjectViewTimes projectViewTimes = ProjectViewTimes.from(decodedCookieValue);
        projectViewTimes.removeExpiredEntries(getCurrentTimeSeconds());
        return projectViewTimes;
    }

    public boolean isViewCountIncreasable(long projectId, ProjectViewTimes projectViewTimes) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        return projectViewTimes.isViewCountIncreasable(projectId, currentTimeSeconds);
    }

    public Cookie createOrUpdateCookie(long projectId, ProjectViewTimes projectViewTimes) {
        if (projectViewTimes.isEmpty()) {
            return createCookie(projectId, projectViewTimes);
        }
        return updateCookie(projectId, projectViewTimes);
    }

    private Cookie createCookie(long projectId, ProjectViewTimes projectViewTimes) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        projectViewTimes.add(projectId, currentTimeSeconds);
        return buildValidCookie(projectViewTimes, secondsUntilMidnight);
    }

    private Cookie updateCookie(long projectId, ProjectViewTimes projectViewTimes) {
        long currentTimeSeconds = getCurrentTimeSeconds();
        long secondsUntilMidnight = getSecondsUntilMidnight(currentTimeSeconds);

        projectViewTimes.removeExpiredEntries(currentTimeSeconds);
        projectViewTimes.add(projectId, currentTimeSeconds);
        projectViewTimes.removeUntilMaxSize();
        return buildValidCookie(projectViewTimes, secondsUntilMidnight);
    }

    private Cookie buildValidCookie(ProjectViewTimes projectViewTimes, long secondsUntilMidnight) {
        String json = projectViewTimes.serializeWithSizeLimit();
        if (projectViewTimes.isInvalidForCookie(json)) {
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