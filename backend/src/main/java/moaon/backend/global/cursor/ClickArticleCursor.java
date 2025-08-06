package moaon.backend.global.cursor;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;

@RequiredArgsConstructor
public class ClickArticleCursor implements ArticleCursor<Integer> {

    private final int clicks;
    private final Long id;

    @Override
    public Integer getSortValue() {
        return clicks;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return clicks + "_" + id;
    }

    @Override
    public void applyCursor(ArticleQueryCondition queryCondition, BooleanBuilder whereBuilder) {
        whereBuilder.and(
                article.clicks.lt(getSortValue())
                        .or(
                                article.clicks.eq(getSortValue())
                                        .and(article.id.lt(getLastId()))
                        )
        );
    }
}
