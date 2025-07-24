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

    /**
     * Initializes a new builder instance with default values for all fields.
     * <p>
     * All list fields are initialized as empty lists, and other fields are set to {@code null}.
     */
    private ProjectQueryConditionFixtureBuilder() {
        this.search = null;
        this.platformNames = new ArrayList<>();
        this.categoryNames = new ArrayList<>();
        this.organizationNames = new ArrayList<>();
        this.techStackNames = new ArrayList<>();
        this.sortBy = null;
    }

    /**
     * Creates a new instance of the ProjectQueryConditionFixtureBuilder.
     *
     * @return a new ProjectQueryConditionFixtureBuilder for building ProjectQueryCondition objects
     */
    public static ProjectQueryConditionFixtureBuilder builder() {
        return new ProjectQueryConditionFixtureBuilder();
    }

    /**
     * Sets the search keyword for the project query condition.
     *
     * @param search the search keyword to use
     * @return this builder instance for method chaining
     */
    public ProjectQueryConditionFixtureBuilder search(String search) {
        this.search = search;
        return this;
    }

    /**
     * Sets the platform names for the query condition using the provided values.
     *
     * @param platformNames the platform names to include in the query condition
     * @return this builder instance for method chaining
     */
    public ProjectQueryConditionFixtureBuilder platformNames(String... platformNames) {
        this.platformNames = new ArrayList<>(Arrays.asList(platformNames));
        return this;
    }


    /**
     * Sets the category names to be used in the query condition.
     *
     * @param categoryNames one or more category names to include
     * @return this builder instance for method chaining
     */
    public ProjectQueryConditionFixtureBuilder categoryNames(String... categoryNames) {
        this.categoryNames = new ArrayList<>(Arrays.asList(categoryNames));
        return this;
    }

    /**
     * Sets the organization names to be used in the query condition.
     *
     * @param organizationNames the organization names to include
     * @return this builder instance for method chaining
     */
    public ProjectQueryConditionFixtureBuilder organizationNames(String... organizationNames) {
        this.organizationNames = new ArrayList<>(Arrays.asList(organizationNames));
        return this;
    }

    /**
     * Sets the list of tech stack names for the query condition.
     *
     * @param techStackNames the tech stack names to include
     * @return this builder instance for method chaining
     */
    public ProjectQueryConditionFixtureBuilder techStackNames(String... techStackNames) {
        this.techStackNames = new ArrayList<>(Arrays.asList(techStackNames));
        return this;
    }

    /**
     * Sets the sorting option for the query condition.
     *
     * @param sortBy the sorting criteria to apply
     * @return this builder instance for method chaining
     */
    public ProjectQueryConditionFixtureBuilder sortBy(SortBy sortBy) {
        this.sortBy = sortBy;
        return this;
    }

    /**
     * Constructs a new {@code ProjectQueryCondition} instance using the current state of the builder.
     *
     * @return a {@code ProjectQueryCondition} populated with the builder's configured values
     */
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
