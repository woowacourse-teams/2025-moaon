package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.stream.Stream;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

class ContentFindersTest {

    private final ContentFinders contentFinders = new ContentFinders();

    @DisplayName("URL에 맞는 Finder를 반환한다.")
    @ParameterizedTest
    @MethodSource("provideUrls")
    void getFinder(String url, Class<? extends ContentFinder> expectedClass) {
        // when
        ContentFinder finder = contentFinders.getFinder(url);

        // then
        assertThat(finder).isInstanceOf(expectedClass);
    }

    @DisplayName("권한이 없는 링크에 접속하면 예외를 발생한다.")
    @Test
    void forbiddenUrl() {
        // given
        String forbiddenNotionUrl = "https://www.notion.so/2294b522306480fb9260d817433ad721?source=copy_link";
        String forbiddenVelogUrl = "https://velog.io/@minjae8563/test-%EC%9A%A9";
        String forbiddenLink = "https://www.notion.so/2804b522306480e4bef2c071fe9359b9?source=copy_link";

        // when - then
        assertThatThrownBy(
                () -> contentFinders.getFinder(forbiddenLink).getText(forbiddenLink)
        )
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.ARTICLE_URL_NOT_FOUND.getMessage());
    }

    private static Stream<Arguments> provideUrls() {
        return Stream.of(
                Arguments.of(
                        "https://nnoco.tistory.com/239",
                        TistoryContentFinder.class
                ),
                Arguments.of("https://mint-scissor-943.notion.site/Suspense-use-2470c7355c2a80a9a5eefefae76ea9f0",
                        NotionContentFinder.class
                ),
                Arguments.of(
                        "https://velog.io/@yukina1418/%EC%B5%9C%EA%B7%BC-%EB%A9%B4%EC%A0%91%EC%9D%84-%EB%8B%A4%EB%8B%88%EB%A9%B4%EC%84%9C-%EB%B0%9B%EC%95%98%EB%8D%98-%EC%A7%88%EB%AC%B8%EB%93%A4",
                        VelogContentFinder.class
                ),
                Arguments.of(
                        "https://moaon.co.kr",
                        BodyFinder.class
                )
        );
    }
}
