package moaon.backend.fixture;

import moaon.backend.article.domain.Sector;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dto.ProjectArticleQueryCondition;

public class ProjectArticleQueryConditionFixtureBuilder {

    private Sector sector;
    private SearchKeyword search;

    public ProjectArticleQueryConditionFixtureBuilder() {
        this.sector = null;
        this.search = new SearchKeyword(null);
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
                this.sector,
                this.search
        );
    }
}
