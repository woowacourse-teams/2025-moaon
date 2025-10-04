package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class NotionContentFinderTest {

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
}
