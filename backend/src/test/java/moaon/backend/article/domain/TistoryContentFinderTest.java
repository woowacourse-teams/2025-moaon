package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

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

}
