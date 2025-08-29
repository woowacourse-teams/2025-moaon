package moaon.backend.fixture;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.domain.ProjectSortType;
import moaon.backend.project.dto.ProjectQueryCondition;

public class ProjectQueryConditionFixtureBuilder {

    private SearchKeyword search;
    private List<String> categoryNames;
    private List<String> techStackNames;
    private ProjectSortType projectSortType;
    private int limit;
    private Cursor<?> cursor;

    public ProjectQueryConditionFixtureBuilder() {
        this.search = new SearchKeyword(null);
        this.categoryNames = new ArrayList<>();
        this.techStackNames = new ArrayList<>();
        this.projectSortType = null;
        this.limit = 50;
        this.cursor = null;
    }

    public ProjectQueryConditionFixtureBuilder search(String search) {
        this.search = new SearchKeyword(search);
        return this;
    }

    public ProjectQueryConditionFixtureBuilder categoryNames(String... categoryNames) {
        this.categoryNames = new ArrayList<>(Arrays.asList(categoryNames));
        return this;
    }

    public ProjectQueryConditionFixtureBuilder techStackNames(String... techStackNames) {
        this.techStackNames = new ArrayList<>(Arrays.asList(techStackNames));
        return this;
    }

    public ProjectQueryConditionFixtureBuilder sortBy(ProjectSortType projectSortType) {
        this.projectSortType = projectSortType;
        return this;
    }

    public ProjectQueryConditionFixtureBuilder limit(int limit) {
        this.limit = limit;
        return this;
    }

    public ProjectQueryConditionFixtureBuilder cursor(Cursor<?> cursor) {
        this.cursor = cursor;
        return this;
    }

    public ProjectQueryCondition build() {
        return new ProjectQueryCondition(
                this.search,
                this.categoryNames,
                this.techStackNames,
                this.projectSortType,
                this.limit,
                this.cursor
        );
    }
}
