package moaon.backend.project.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class ProjectSortTypeTest {

    @DisplayName("정렬 기준을 받아서 SortBy를 반환한다.")
    @ParameterizedTest()
    @CsvSource({"createdAt,CREATED_AT", "views,VIEWS", "loves,LOVES", "createdat,CREATED_AT", ",CREATED_AT"})
    void from(String sortType, ProjectSortType expected) {
        //when
        ProjectSortType actual = ProjectSortType.from(sortType);

        //then
        assertThat(actual).isEqualTo(expected);
    }
}
