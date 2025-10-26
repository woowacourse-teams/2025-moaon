package moaon.backend.article.repository.es;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import moaon.backend.article.domain.Article;
import moaon.backend.article.repository.ArticleSearchResult;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.elasticsearch.core.SearchHits;

class ESArticleSearchResultTest {

    private final SearchHits mockSearchHits = mock(SearchHits.class);

    @DisplayName("ArticleSearchResult를 만든다.")
    @Test
    void constructor() {
        // given
        when(mockSearchHits.getTotalHits()).thenReturn(2L); // totalHits 2

        ArticleSearchResult searchResult = new ESArticleSearchResult(mockSearchHits,
                List.of(anyArticle(), anyArticle()), 20);

        assertAll(
                () -> assertThat(searchResult.getArticles()).hasSize(2),
                () -> assertThat(searchResult.getTotalCount()).isEqualTo(2),
                () -> assertThat(searchResult.getNextCursor()).isNull(),
                () -> assertThat(searchResult.hasNext()).isFalse()
        );
    }

    @DisplayName("아티클 리스트를 얻는다.")
    @Test
    void getArticles() {
        // given
        List<Article> threeArticles = List.of(anyArticle(), anyArticle(), anyArticle());
        ESArticleSearchResult searchResult = new ESArticleSearchResult(mockSearchHits, threeArticles, 20);

        // when
        List<Article> articles = searchResult.getArticles();

        // then
        assertThat(articles).hasSize(3);
    }

    @DisplayName("아티클이 더 존재하는 지 알 수 있다. - true")
    @Test
    void hasNextTrue() {
        // given
        List<Article> threeArticles = List.of(anyArticle(), anyArticle(), anyArticle());
        when(mockSearchHits.getTotalHits()).thenReturn(999L);
        ESArticleSearchResult articles = new ESArticleSearchResult(
                mockSearchHits, // totalHits 999
                threeArticles, // 검색결과 3개
                3 // 페이지 크기 3
        );

        // when
        boolean hasNext = articles.hasNext();

        // then
        assertThat(hasNext).isTrue();
    }

    @DisplayName("아티클이 더 존재하는 지 알 수 있다. - false")
    @Test
    void hasNextFalse() {
        List<Article> twoArticles = List.of(anyArticle(), anyArticle());
        when(mockSearchHits.getTotalHits()).thenReturn(3L);
        ESArticleSearchResult articles = new ESArticleSearchResult(
                mockSearchHits, // totalHits 2
                twoArticles, // 검색결과 2개
                3 // 페이지 크기 3
        );

        // when
        boolean hasNext = articles.hasNext();

        // then
        assertThat(hasNext).isFalse();
    }

    private AtomicLong seq = new AtomicLong(1);

    private Article anyArticle() {
        return Article.builder()
                .id(seq.getAndIncrement())
                .build();
    }
}
