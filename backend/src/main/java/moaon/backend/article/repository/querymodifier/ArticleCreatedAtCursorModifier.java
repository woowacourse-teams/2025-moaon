package moaon.backend.article.repository.querymodifier;

import static moaon.backend.article.domain.QArticle.article;

import com.querydsl.core.BooleanBuilder;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.cursor.Cursor;
import moaon.backend.global.repository.QueryModifier;

@RequiredArgsConstructor
public class ArticleCreatedAtCursorModifier implements QueryModifier<Void, ArticleQueryCondition> {

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ArticleQueryCondition condition) {
        Cursor<LocalDateTime> cursor = (Cursor<LocalDateTime>) condition.articleCursor();
        LocalDateTime sortValue = cursor.getSortValue();
        Long lastId = cursor.getLastId();

        whereBuilder.and(article.createdAt.lt(sortValue)
                .or(article.createdAt.eq(sortValue).and(article.id.lt(lastId)))
        );

        return null;
    }
}
