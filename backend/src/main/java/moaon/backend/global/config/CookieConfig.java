package moaon.backend.global.config;

import moaon.backend.global.cookie.ProjectViewCookieManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CookieConfig {

    @Bean
    public ProjectViewCookieManager projectViewCookieManager() {
        return new ProjectViewCookieManager();
    }
}
