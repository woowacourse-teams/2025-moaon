package moaon.backend.article.dto;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.URL;

public record ArticleCrawlRequest(
        @NotNull @URL String url
) {
}
