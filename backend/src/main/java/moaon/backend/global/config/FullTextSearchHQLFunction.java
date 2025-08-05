package moaon.backend.global.config;

import static org.hibernate.type.StandardBasicTypes.DOUBLE;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.query.sqm.function.SqmFunctionRegistry;
import org.hibernate.type.BasicType;

public class FullTextSearchHQLFunction implements FunctionContributor {

    private static final String PROJECT_FUNCTION_NAME = "project_match_against";
    private static final String ARTICLE_FUNCTION_NAME = "article_match_against";

    private static final String PROJECT_SQL_PATTERN = "match (title, summary, description) against (?1 in boolean mode)";
    private static final String ARTICLE_SQL_PATTERN = "match (title, summary, content) against (?1 in boolean mode)";

    /**
     * {0} - query format to search<br>
     */
    public static final String PROJECT_EXPRESSION_TEMPLATE = PROJECT_FUNCTION_NAME + "({0})";
    public static final String ARTICLE_EXPRESSION_TEMPLATE = ARTICLE_FUNCTION_NAME + "({0})";

    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {
        BasicType<Double> columnTypeToSelect = functionContributions.getTypeConfiguration()
                .getBasicTypeRegistry()
                .resolve(DOUBLE);

        SqmFunctionRegistry functionRegistry = functionContributions.getFunctionRegistry();
        functionRegistry.registerPattern(PROJECT_FUNCTION_NAME, PROJECT_SQL_PATTERN, columnTypeToSelect);
        functionRegistry.registerPattern(ARTICLE_FUNCTION_NAME, ARTICLE_SQL_PATTERN, columnTypeToSelect);
    }
}
