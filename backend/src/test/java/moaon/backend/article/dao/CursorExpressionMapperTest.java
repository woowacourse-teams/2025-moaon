package moaon.backend.article.dao;

import static org.assertj.core.api.Assertions.assertThat;

import com.querydsl.core.types.dsl.BooleanExpression;
import java.time.LocalDateTime;
import moaon.backend.article.domain.ArticleCursor;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.repository.db.ArticleFullTextSearchHQLFunction;
import moaon.backend.global.domain.SearchKeyword;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CursorExpressionMapperTest {

    @DisplayName("정렬 기준이 CREATED_AT일 때 createdAt 및 id 기준 커서 조건을 생성한다.")
    @Test
    void createsConditionForCreatedAtSort() {
        // given
        ArticleCursor cursor = new ArticleCursor(LocalDateTime.of(2025, 10, 26, 12, 0), 10L);
        ArticleSortType sortType = ArticleSortType.CREATED_AT;

        // when
        BooleanExpression where = CursorExpressionMapper.toWhereClause(cursor, sortType, null);

        // then
        assertThat(where.toString())
                .containsSubsequence("article.createdAt <", "||", "article.createdAt =", "&&", "article.id <");
    }

    @DisplayName("정렬 기준이 CLICKS일 때 clicks 및 id 기준 커서 조건을 생성한다.")
    @Test
    void createsConditionForClicksSort() {
        // given
        ArticleCursor cursor = new ArticleCursor(123, 9L);
        ArticleSortType sortType = ArticleSortType.CLICKS;

        // when
        BooleanExpression where = CursorExpressionMapper.toWhereClause(cursor, sortType, null);

        // then
        assertThat(where.toString())
                .containsSubsequence("article.clicks <", "||", "article.clicks =", "&&", "article.id <");
    }

    @DisplayName("정렬 기준이 RELEVANCE일 때 score 및 id 기준 커서 조건을 생성한다.")
    @Test
    void createsConditionForRelevanceSort() {
        // given
        SearchKeyword keyword = new SearchKeyword("버저닝");
        ArticleCursor cursor = new ArticleCursor(0.85, 5L);
        ArticleSortType sortType = ArticleSortType.RELEVANCE;

        // when
        BooleanExpression where = CursorExpressionMapper.toWhereClause(cursor, sortType, keyword);

        // then
        String ftsTemplate = ArticleFullTextSearchHQLFunction.EXPRESSION_TEMPLATE.replace("{0}", "+버저닝*");
        assertThat(where.toString())
                .containsSubsequence(ftsTemplate + " <", "||", ftsTemplate + " =", "&&", "article.id <");
    }

    @DisplayName("RELEVANCE 정렬이지만 검색어가 없으면 null을 반환한다.")
    @Test
    void returnsNullWhenSearchKeywordIsEmpty() {
        // given
        SearchKeyword keyword = new SearchKeyword("");
        ArticleCursor cursor = new ArticleCursor(0.5, 1L);

        // when
        BooleanExpression where = CursorExpressionMapper.toWhereClause(cursor, ArticleSortType.RELEVANCE, keyword);

        // then
        assertThat(where).isNull();
    }
}
