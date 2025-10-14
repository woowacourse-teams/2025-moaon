package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TistoryContentFinderTest {

    @DisplayName("티스토리 링크를 다룰 수 있다면 true 를 리턴한다.")
    @Test
    void canHandle() {
        // given
        String tistoryLink = "https://nnoco.tistory.com/239";
        String notTistroyLink = "https://nnoco.notion.site/239";

        TistoryContentFinder tistoryContentFinder = new TistoryContentFinder();

        // when - then
        assertAll(
                () -> assertThat(tistoryContentFinder.canHandle(tistoryLink)).isTrue(),
                () -> assertThat(tistoryContentFinder.canHandle(notTistroyLink)).isFalse()
        );
    }

    @DisplayName("tistory 크롤링")
    @Test
    void crawl() {
        // given
        String normalLink = "https://minjae8563.tistory.com/6";
        TistoryContentFinder tistoryContentFinder = new TistoryContentFinder();

        // when
        ArticleCrawlResponse result = tistoryContentFinder.crawl(normalLink);

        // then
        assertAll(
                () -> assertThat(result.title()).isEqualTo("공개 게시글입니다."),
                () -> assertThat(result.summary()).startsWith("안녕하세요"),
                () -> assertThat(result.summary().length()).isLessThanOrEqualTo(255)
        );
    }

    @DisplayName("권한이 없거나 삭제된 티스토리 글은 예외를 발생한다.")
    @Test
    void crawlFail() {
        // given
        String forbiddenLink = "https://minjae8563.tistory.com/3";
        String deleteLink = "https://minjae8563.tistory.com/5";

        TistoryContentFinder tistoryContentFinder = new TistoryContentFinder();

        // when - then
        assertAll(
                () -> assertThatThrownBy(() -> tistoryContentFinder.crawl(forbiddenLink))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.ARTICLE_URL_FORBIDDEN.getMessage()),
                () -> assertThatThrownBy(() -> tistoryContentFinder.crawl(deleteLink))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.ARTICLE_URL_NOT_FOUND.getMessage())
        );
    }
}
