package moaon.backend.article.repository;

import static org.hibernate.type.StandardBasicTypes.DOUBLE;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.query.sqm.function.SqmFunctionRegistry;
import org.hibernate.type.BasicType;

public class ArticleFullTextSearchHQLFunction implements FunctionContributor {

    private static final String FUNCTION_NAME = "article_match_against";

    private static final String SQL_PATTERN = "match (title, summary, content) against (?1 in boolean mode)";

    /**
     * {0} - query format to search<br>
     */
    public static final String EXPRESSION_TEMPLATE = FUNCTION_NAME + "({0})";

    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {
        BasicType<Double> columnTypeToSelect = functionContributions.getTypeConfiguration()
                .getBasicTypeRegistry()
                .resolve(DOUBLE);

        SqmFunctionRegistry functionRegistry = functionContributions.getFunctionRegistry();
        functionRegistry.registerPattern(FUNCTION_NAME, SQL_PATTERN, columnTypeToSelect);
    }
}
