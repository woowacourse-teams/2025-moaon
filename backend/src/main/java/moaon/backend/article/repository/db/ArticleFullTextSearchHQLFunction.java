package moaon.backend.article.repository.db;

import static org.hibernate.type.StandardBasicTypes.DOUBLE;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import java.util.Arrays;
import java.util.stream.Collectors;
import moaon.backend.global.domain.SearchKeyword;
import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.query.sqm.function.SqmFunctionRegistry;
import org.hibernate.type.BasicType;

public class ArticleFullTextSearchHQLFunction implements FunctionContributor {

    private static final String FUNCTION_NAME = "article_match_against";

    private static final String SQL_PATTERN = "match (title, summary, content) against (?1 in boolean mode)";
    private static final String BLANK = " ";

    /**
     * {0} - query format to search<br>
     */
    public static final String EXPRESSION_TEMPLATE = FUNCTION_NAME + "({0})";

    public static NumberTemplate<Double> scoreReference(SearchKeyword searchKeyword) {
        return Expressions.numberTemplate(
                Double.class,
                ArticleFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                formatSearchKeyword(searchKeyword)
        );
    }

    private static String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(ArticleFullTextSearchHQLFunction::applyBooleanModeExpression)
                .collect(Collectors.joining(BLANK));
    }

    private static String applyBooleanModeExpression(String keyword) {
        if (keyword.length() == 1) {
            return String.format("%s*", keyword);
        }
        return String.format("+%s*", keyword.toLowerCase());
    }

    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {
        BasicType<Double> columnTypeToSelect = functionContributions.getTypeConfiguration()
                .getBasicTypeRegistry()
                .resolve(DOUBLE);

        SqmFunctionRegistry functionRegistry = functionContributions.getFunctionRegistry();
        functionRegistry.registerPattern(FUNCTION_NAME, SQL_PATTERN, columnTypeToSelect);
    }
}
