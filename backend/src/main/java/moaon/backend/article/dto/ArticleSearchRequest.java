package moaon.backend.article.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.Getter;
import lombok.Setter;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.global.domain.SearchKeyword;

@Setter
@Getter
public class ArticleSearchRequest {
    private String sort;
    private List<String> techStacks = new ArrayList<>();
    private String sector;
    private List<String> topics = new ArrayList<>();
    private String search;
    @Min(1)
    @Max(100)
    private int limit = 1;
    private String cursor;

    public ArticleQueryCondition toCondition() {
        return new ArticleQueryCondition(
                new SearchKeyword(search),
                Sector.of(sector),
                topicsToEnum(),
                techStacks,
                ArticleSortType.from(sort),
                limit,
                cursor == null ? null : new ArticleCursor(cursor)
        );
    }

    private List<Topic> topicsToEnum() {
        return topics.stream()
                .map(Topic::of)
                .filter(Objects::nonNull)
                .toList();
    }
}
