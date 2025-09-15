package moaon.backend.project.dto;

import moaon.backend.article.domain.Sector;
import moaon.backend.global.domain.SearchKeyword;

public record ProjectArticleQueryCondition(
        Sector sector,
        SearchKeyword search
) {

    public static ProjectArticleQueryCondition from(
            String sector,
            String search
    ) {
        return new ProjectArticleQueryCondition(
                Sector.of(sector),
                new SearchKeyword(search));
    }
}
