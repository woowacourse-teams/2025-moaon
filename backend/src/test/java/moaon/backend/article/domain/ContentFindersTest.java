package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Stream;
import org.junit.jupiter.api.DisplayName;
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
