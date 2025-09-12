package moaon.backend.project.dto;

import moaon.backend.article.domain.Sector;
import moaon.backend.global.domain.SearchKeyword;

public record ProjectArticleQueryCondition(
        long id,
        Sector sector,
        SearchKeyword search
) {

    public static ProjectArticleQueryCondition from(
            long id,
            String sector,
            String search
    ) {
        return new ProjectArticleQueryCondition(
                id,
                Sector.of(sector),
                new SearchKeyword(search));
    }
}
