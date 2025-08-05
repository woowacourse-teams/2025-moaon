package moaon.backend.global.cursor;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.BooleanBuilder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;

@RequiredArgsConstructor
public class CreatedAtCursor implements Cursor<LocalDateTime> {

    private final LocalDateTime createdAt;
    private final Long id;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public LocalDateTime getSortValue() {
        return createdAt;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return createdAt.format(FORMATTER) + "_" + id;
    }

    @Override
    public void applyCursor(ArticleQueryCondition queryCondition, BooleanBuilder whereBuilder) {
        whereBuilder.and(article.createdAt.lt(getSortValue())
                .or(article.createdAt.eq(getSortValue())
                        .and(article.id.lt(getLastId()))));
    }
}
