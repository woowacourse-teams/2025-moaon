package moaon.backend.global.config;

import static org.hibernate.type.StandardBasicTypes.DOUBLE;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.type.BasicType;

public class FullTextSearchHQLFunction implements FunctionContributor {

    /**
     * {0} - query format to search<br>
     */
    public static final String EXPRESSION_TEMPLATE = "match_against({0})";
    public static final String FUNCTION_NAME = "match_against";

    private static final String PROJECT_SQL_PATTERN = "match (title, summary, description) against (?1 in boolean mode)";

    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {
        BasicType<Double> columnTypeToSelect = functionContributions.getTypeConfiguration()
            .getBasicTypeRegistry()
            .resolve(DOUBLE);

        functionContributions.getFunctionRegistry()
            .registerPattern(FUNCTION_NAME, PROJECT_SQL_PATTERN, columnTypeToSelect);
    }
}
