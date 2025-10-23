package moaon.backend.article.dto;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import moaon.backend.article.domain.ArticleSortType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

class ArticleESQueryTest {

    @DisplayName("관련도순 정렬인데 검색어가 없으면 CREATED_AT 정렬 기준을 선택한다.")
    @ParameterizedTest
    @ValueSource(strings = {"", "  ", "\n", "\t"})
    @NullSource
    void from_relevance_with_no_searchKeyword(String emptySearch) {
        ArticleESQuery query = ArticleESQuery.from(emptySearch, "be", List.of(), List.of(), "relevance", 10, null);

        assertThat(query.sortBy()).isEqualTo(ArticleSortType.CREATED_AT);
    }

    @DisplayName("관련도순 정렬이면서 검색어가 있으면 RELEVANCE 정렬 기준을 선택한다.")
    @Test
    void from_relevance_with_searchKeyword() {
        ArticleESQuery query = ArticleESQuery.from("검색어", "be", List.of(), List.of(), "relevance", 10, null);
        assertThat(query.sortBy()).isEqualTo(ArticleSortType.RELEVANCE);
    }
}
