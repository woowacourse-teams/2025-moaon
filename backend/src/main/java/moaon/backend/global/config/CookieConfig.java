package moaon.backend.global.config;

import moaon.backend.global.cookie.TrackingCookieManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CookieConfig {

    private static final String PROJECT_COOKIE_NAME = "viewed_projects";
    private static final String COOKIE_PATH = "/";
    private static final String ARTICLE_COOKIE_NAME = "clicked_articles";

    @Bean
    public TrackingCookieManager projectViewCookieManager() {
        return new TrackingCookieManager(PROJECT_COOKIE_NAME, COOKIE_PATH);
    }

    @Bean
    public TrackingCookieManager articleClickCookieManager() {
        return new TrackingCookieManager(ARTICLE_COOKIE_NAME, COOKIE_PATH);
    }
}
