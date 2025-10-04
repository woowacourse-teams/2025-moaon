package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class VelogContentFinderTest {

    @DisplayName("velog 링크를 다룰 수 있다면 true 를 리턴한다.")
    @Test
    void canHandle() {
        // given
        String velogLink = "https://velog.io/@yukina1418/%EC%B5%9C%EA%B7%BC-%EB%A9%B4%EC%A0%91%EC%9D%84-%EB%8B%A4%EB%8B%88%EB%A9%B4%EC%84%9C-%EB%B0%9B%EC%95%98%EB%8D%98-%EC%A7%88%EB%AC%B8%EB%93%A4";
        String notVelogLink = "https://notion.io/@yukina1418/%EC%B5%9C%EA%B7%BC";

        VelogContentFinder velogContentFinder = new VelogContentFinder();

        // when - then
        assertAll(
                () -> assertThat(velogContentFinder.canHandle(velogLink)).isTrue(),
                () -> assertThat(velogContentFinder.canHandle(notVelogLink)).isFalse()
        );
    }

}
