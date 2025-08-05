package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class ArticleSortByTest {

    @DisplayName("정렬 기준을 받아서 SortBy를 반환한다.")
    @ParameterizedTest()
    @CsvSource({"createdAt,CREATED_AT", "clicks,CLICKS", "createdat,CREATED_AT", ",CREATED_AT"})
    void from(String sortType, ArticleSortBy expected) {
        //when
        ArticleSortBy actual = ArticleSortBy.from(sortType);

        //then
        assertThat(actual).isEqualTo(expected);
    }
}
