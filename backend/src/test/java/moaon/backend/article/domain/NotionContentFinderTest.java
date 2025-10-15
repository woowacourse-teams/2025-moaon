package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.net.MalformedURLException;
import java.net.URL;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.global.util.EnvLoader;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@Disabled
class NotionContentFinderTest {

    private static final NotionContentFinder NOTION_CONTENT_FINDER = new NotionContentFinder(
            EnvLoader.getEnv("NOTION_USER_ID"),
            EnvLoader.getEnv("NOTION_TOKEN_V2")
    );

    @DisplayName("노션 링크를 다룰 수 있다면 true 를 리턴한다.")
    @Test
    void canHandle() throws MalformedURLException {
        // given
        URL notionLink = new URL("https://mint-scissor-943.notion.site/Suspense-use-2470c7355c2a80a9a5eefefae76ea9f0");
        URL notNotionLink = new URL("https://mint-scissor-943.velog.io/Suspense-use-2470c7355c2a80a9a5eefefae76ea9f0");

        // when - then
        assertAll(
                () -> assertThat(NOTION_CONTENT_FINDER.canHandle(notionLink)).isTrue(),
                () -> assertThat(NOTION_CONTENT_FINDER.canHandle(notNotionLink)).isFalse()
        );
    }

    @DisplayName("notion 크롤링")
    @Test
    void crawl() throws MalformedURLException {
        // given
        URL normalLink = new URL(
                "https://tattered-drive-af3.notion.site/2744b522306480b89b42cc6dccb59b99?source=copy_link");

        // when
        ArticleCrawlResult result = NOTION_CONTENT_FINDER.crawl(normalLink);

        // then
        assertAll(
                () -> assertThat(result.title()).isEqualTo("쿼리튜닝"),
                () -> assertThat(result.summary()).startsWith("## localhost:8080/articles?limit=20"),
                () -> assertThat(result.summary().length()).isEqualTo(255)
        );
    }

    @DisplayName("notion 링크에 권한이 없거나 삭제된 페이지라면 예외를 던진다.")
    @Test
    void crawlFail() throws MalformedURLException {
        // given
        URL forbiddenLink = new URL("https://www.notion.so/2804b522306480e4bef2c071fe9359b9?source=copy_link");
        URL deleteLink = new URL("https://www.notion.so/test-2853a9d1094e8040bd37f18e3a23bd0a?source=copy_link");

        // when - then
        assertAll(
                () -> assertThatThrownBy(() -> NOTION_CONTENT_FINDER.crawl(forbiddenLink))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.ARTICLE_URL_NOT_FOUND.getMessage()),
                () -> assertThatThrownBy(() -> NOTION_CONTENT_FINDER.crawl(deleteLink))
                        .isInstanceOf(CustomException.class)
                        .hasMessage(ErrorCode.ARTICLE_URL_NOT_FOUND.getMessage())
        );
    }
}
