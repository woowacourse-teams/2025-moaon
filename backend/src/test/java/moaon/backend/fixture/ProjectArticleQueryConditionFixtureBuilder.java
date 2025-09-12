package moaon.backend.fixture;

import moaon.backend.article.domain.Sector;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

public class ProjectArticleQueryConditionFixtureBuilder {

    private long id;
    private Sector sector;
    private SearchKeyword search;

    public ProjectArticleQueryConditionFixtureBuilder() {
        this.id = 0; // 필수로 설정해야 하는 값입니다
        this.sector = null;
        this.search = new SearchKeyword(null);
    }

    public ProjectArticleQueryConditionFixtureBuilder id(long id) {
        this.id = id;
        return this;
    }

    public ProjectArticleQueryConditionFixtureBuilder sector(Sector sector) {
        this.sector = sector;
        return this;
    }

    public ProjectArticleQueryConditionFixtureBuilder search(SearchKeyword search) {
        this.search = search;
        return this;
    }

    public ProjectArticleQueryCondition build() {
        return new ProjectArticleQueryCondition(
                this.id,
                this.sector,
                this.search
        );
    }
}
