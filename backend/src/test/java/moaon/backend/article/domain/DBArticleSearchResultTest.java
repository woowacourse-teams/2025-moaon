package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import moaon.backend.article.repository.ArticleSearchResult;
import moaon.backend.article.repository.db.DBArticleSearchResult;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DBArticleSearchResultTest {

    @DisplayName("비어있는 ArticleSearchResult를 만든다.")
    @Test
    void empty() {
        ArticleSearchResult articles = DBArticleSearchResult.empty();
        assertAll(
                () -> assertThat(articles.getArticles()).isEmpty(),
                () -> assertThat(articles.getTotalCount()).isEqualTo(0),
                () -> assertThat(articles.getNextCursor()).isNull(),
                () -> assertThat(articles.hasNext()).isFalse()
        );
    }

    @DisplayName("limit와 articles의 크기를 비교해 최종적으로 반환할 아티클 리스트를 반환한다.")
    @Test
    void getArticles() {
        // given
        List<Article> threeArticles = List.of(anyArticle(), anyArticle(), anyArticle());
        DBArticleSearchResult articles = new DBArticleSearchResult(threeArticles, 4, 2, ArticleSortType.CLICKS);

        // when
        List<Article> toReturn = articles.getArticles();

        // then
        assertThat(toReturn).hasSize(2);
    }

    @DisplayName("최종적으로 반환될 아티클 중 마지막 아티클의 커서를 반환한다.")
    @Test
    void getNextCursor() {
        // given
        List<Article> threeArticles = List.of(anyArticle(), anyArticle(), anyArticle());
        DBArticleSearchResult articles = new DBArticleSearchResult(threeArticles, 4, 2, ArticleSortType.CLICKS);
        Article finallyLastArticle = articles.getArticles().getLast();

        // when
        ArticleCursor nextCursor = articles.getNextCursor();

        // then
        assertThat(nextCursor.getLastId()).isEqualTo(finallyLastArticle.getId());
    }

    // 1개를 의도적으로 더 조회해서, 리스트의 크기가 limit보다 크면 더 존재한다고 판단
    @DisplayName("아티클이 더 존재하는 지 알 수 있다. - true")
    @Test
    void hasNextTrue() {
        // given
        List<Article> threeArticles = List.of(anyArticle(), anyArticle(), anyArticle());
        DBArticleSearchResult articles = new DBArticleSearchResult(
                threeArticles, // 현재 페이지 : 3개
                999, // 전체 아티클 개수
                2, // 페이지 크기
                ArticleSortType.CLICKS
        );

        // when
        boolean hasNext = articles.hasNext();

        // then
        assertThat(hasNext).isTrue();
    }

    @DisplayName("아티클이 더 존재하는 지 알 수 있다. - false")
    @Test
    void hasNextFalse() {
        // given
        List<Article> threeArticles = List.of(anyArticle(), anyArticle(), anyArticle());
        DBArticleSearchResult articles = new DBArticleSearchResult(
                threeArticles, // 현재 페이지 : 3개
                999, // 전체 아티클 개수
                3, // 페이지 크기
                ArticleSortType.CLICKS
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
