package moaon.backend.article.dto;

import moaon.backend.article.domain.Sector;

public record ArticleSectorCount(
        String sector,
        int count
) {

    public static ArticleSectorCount of(Sector sector, int count) {
        return new ArticleSectorCount(sector.getName(), count);
    }
}
