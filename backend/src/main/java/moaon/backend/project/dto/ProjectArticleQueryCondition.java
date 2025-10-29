package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.SearchKeyword;

public record ProjectArticleQueryCondition(
        Sector sector,
        SearchKeyword search
) {

    public ArticleQueryCondition toArticleCondition() {
        return new ArticleQueryCondition(
                this.search,
                this.sector,
                List.of(),
                List.of(),
                ArticleSortType.CREATED_AT, // 프로젝트 상세 페이지 정렬옵션 정책 없으므로 기본값
                999, // 프로젝트 상세 페이지 무제한 페이징
                null
        );
    }

    public static ProjectArticleQueryCondition from(
            String sector,
            String search
    ) {
        return new ProjectArticleQueryCondition(
                Sector.of(sector),
                new SearchKeyword(search));
    }
}
