package moaon.backend.article.dto;

import jakarta.validation.constraints.NotNull;
import java.net.URL;

public record ArticleCrawlRequest(
        @NotNull @org.hibernate.validator.constraints.URL URL url
) {
}
