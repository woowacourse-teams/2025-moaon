package moaon.backend.article.dto;

import java.util.Map;
import moaon.backend.article.domain.Sector;

public record ArticleSectorCount(
        String sector,
        long count
) {

    public static ArticleSectorCount of(Sector sector, long count) {
        return new ArticleSectorCount(sector.getName(), count);
    }

    public static ArticleSectorCount all(Map<Sector, Long> articleCountBySector) {
        long totalCount = articleCountBySector.values().stream()
                .mapToLong(Long::longValue)
                .sum();

        return new ArticleSectorCount("all", totalCount);
    }
}
