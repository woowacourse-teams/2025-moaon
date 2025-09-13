package moaon.backend.article.dto;

import moaon.backend.article.domain.Sector;

public record ArticleSectorCount(
        String sector,
        long count
) {

    public static ArticleSectorCount of(Sector sector, long count) {
        return new ArticleSectorCount(sector.getName(), count);
    }

    public static ArticleSectorCount all(long count) {
        return new ArticleSectorCount("all", count);
    }
}
