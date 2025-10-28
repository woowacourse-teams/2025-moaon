package moaon.backend.article.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class ArticleSortTypeTest {

    @DisplayName("정렬 기준을 받아서 SortType을 반환한다.")
    @ParameterizedTest()
    @CsvSource({"createdAt,CREATED_AT", "clicks,CLICKS", "createdat,CREATED_AT", ",CREATED_AT"})
    void from(String sortType, ArticleSortType expected) {
        //when
        ArticleSortType actual = ArticleSortType.from(sortType);

        //then
        assertThat(actual).isEqualTo(expected);
    }
}
