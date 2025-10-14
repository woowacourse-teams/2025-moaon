package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import moaon.backend.api.BaseApiTest;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@Disabled
class NotionContentFinderTest extends BaseApiTest {

    @DisplayName("노션 링크를 다룰 수 있다면 true 를 리턴한다.")
    @Test
    void canHandle() {
        // given
        String notionLink = "https://mint-scissor-943.notion.site/Suspense-use-2470c7355c2a80a9a5eefefae76ea9f0";
        String notNotionLink = "https://mint-scissor-943.velog.io/Suspense-use-2470c7355c2a80a9a5eefefae76ea9f0";

        NotionContentFinder notionContentFinder = new NotionContentFinder();

        // when - then
        assertAll(
                () -> assertThat(notionContentFinder.canHandle(notionLink)).isTrue(),
                () -> assertThat(notionContentFinder.canHandle(notNotionLink)).isFalse()
        );
    }

    @DisplayName("notion 크롤링")
    @Test
    void crawl() {
        // given
        String normalLink = "https://tattered-drive-af3.notion.site/2744b522306480b89b42cc6dccb59b99?source=copy_link";
        NotionContentFinder notionContentFinder = new NotionContentFinder();

        // when
        ArticleCrawlResponse result = notionContentFinder.crawl(normalLink);

        // then
        assertAll(
                () -> assertThat(result.title()).isEqualTo("쿼리튜닝"),
                () -> assertThat(result.summary()).startsWith("## localhost:8080/articles?limit=20"),
                () -> assertThat(result.summary().length()).isEqualTo(255)
        );
    }

    @DisplayName("notion 링크에 권한이 없거나 삭제된 페이지라면 예외를 던진다.")
    @Test
    void crawlFail() {
        // given
        String forbiddenLink = "https://www.notion.so/2804b522306480e4bef2c071fe9359b9?source=copy_link";
        String deleteLink = "https://www.notion.so/test-2853a9d1094e8040bd37f18e3a23bd0a?source=copy_link";

        NotionContentFinder notionContentFinder = new NotionContentFinder();

        // when - then
        assertAll(
                () -> assertThatThrownBy(() -> notionContentFinder.crawl(forbiddenLink))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.ARTICLE_URL_NOT_FOUND.getMessage()),
                () -> assertThatThrownBy(() -> notionContentFinder.crawl(deleteLink))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.ARTICLE_URL_NOT_FOUND.getMessage())
        );
    }
}
