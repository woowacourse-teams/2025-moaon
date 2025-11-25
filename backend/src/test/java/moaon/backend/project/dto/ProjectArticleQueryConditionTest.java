package moaon.backend.project.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.SearchKeyword;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ProjectArticleQueryConditionTest {

    @DisplayName("toArticleCondition()은 프로젝트 상세 페이지 기본 정책을 반영한다.")
    @Test
    void toArticleCondition_setsDefaultPolicy() {
        // given
        SearchKeyword search = new SearchKeyword("검색어");
        ProjectArticleQueryCondition condition = new ProjectArticleQueryCondition(Sector.BE, search);

        // when
        ArticleQueryCondition articleCondition = condition.toArticleCondition();

        // then
        assertAll(
                () -> assertThat(articleCondition.sector()).isEqualTo(Sector.BE),
                () -> assertThat(articleCondition.search()).isEqualTo(search),
                () -> assertThat(articleCondition.sortType()).isEqualTo(ArticleSortType.CREATED_AT),
                () -> assertThat(articleCondition.limit()).isEqualTo(999),
                () -> assertThat(articleCondition.cursor()).isNull(),
                () -> assertThat(articleCondition.techStackNames()).isEmpty(),
                () -> assertThat(articleCondition.topics()).isEmpty()
        );
    }

    @DisplayName("from()은 문자열 입력을 Sector, SearchKeyword로 변환한다.")
    @Test
    void from_convertsStringToTypes() {
        // when
        ProjectArticleQueryCondition condition = ProjectArticleQueryCondition.from("be", "버저닝");

        // then
        assertAll(
                () -> assertThat(condition.sector()).isEqualTo(Sector.BE),
                () -> assertThat(condition.search().value()).isEqualTo("버저닝")
        );
    }

    @DisplayName("검색어가 null이어도 SearchKeyword는 빈 값으로 생성된다.")
    @Test
    void from_handlesNullSearch() {
        // when
        ProjectArticleQueryCondition condition = ProjectArticleQueryCondition.from("WEB", null);

        // then
        assertAll(
                () -> assertThat(condition.search()).isNotNull(),
                () -> assertThat(condition.search().hasValue()).isFalse()
        );
    }
}
