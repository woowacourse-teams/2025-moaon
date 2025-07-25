package moaon.backend.fixture;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import moaon.backend.project.domain.SortBy;
import moaon.backend.project.dto.ProjectQueryCondition;

public class ProjectQueryConditionFixtureBuilder {

    private String search;
    private List<String> platformNames;
    private List<String> categoryNames;
    private List<String> organizationNames;
    private List<String> techStackNames;
    private SortBy sortBy;

    public ProjectQueryConditionFixtureBuilder() {
        this.search = null;
        this.platformNames = new ArrayList<>();
        this.categoryNames = new ArrayList<>();
        this.organizationNames = new ArrayList<>();
        this.techStackNames = new ArrayList<>();
        this.sortBy = null;
    }

    public ProjectQueryConditionFixtureBuilder search(String search) {
        this.search = search;
        return this;
    }

    public ProjectQueryConditionFixtureBuilder platformNames(String... platformNames) {
        this.platformNames = new ArrayList<>(Arrays.asList(platformNames));
        return this;
    }


    public ProjectQueryConditionFixtureBuilder categoryNames(String... categoryNames) {
        this.categoryNames = new ArrayList<>(Arrays.asList(categoryNames));
        return this;
    }

    public ProjectQueryConditionFixtureBuilder organizationNames(String... organizationNames) {
        this.organizationNames = new ArrayList<>(Arrays.asList(organizationNames));
        return this;
    }

    public ProjectQueryConditionFixtureBuilder techStackNames(String... techStackNames) {
        this.techStackNames = new ArrayList<>(Arrays.asList(techStackNames));
        return this;
    }

    public ProjectQueryConditionFixtureBuilder sortBy(SortBy sortBy) {
        this.sortBy = sortBy;
        return this;
    }

    public ProjectQueryCondition build() {
        return new ProjectQueryCondition(
                this.search,
                this.platformNames,
                this.categoryNames,
                this.organizationNames,
                this.techStackNames,
                this.sortBy
        );
    }
}
