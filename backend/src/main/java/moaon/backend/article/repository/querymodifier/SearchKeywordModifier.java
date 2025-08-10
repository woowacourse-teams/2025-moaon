package moaon.backend.article.repository.querymodifier;

import static org.hibernate.type.StandardBasicTypes.DOUBLE;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import java.util.Arrays;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.QueryModifier;
import moaon.backend.global.domain.SearchKeyword;
import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.query.sqm.function.SqmFunctionRegistry;
import org.hibernate.type.BasicType;

@RequiredArgsConstructor
public class SearchKeywordModifier implements QueryModifier<Void, ArticleQueryCondition> {

    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";

    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ArticleQueryCondition condition) {
        SearchKeyword searchKeyword = condition.search();
        if (searchKeyword.hasValue()) {
            whereBuilder.and(satisfiesMatchScore(searchKeyword));
        }

        return null;
    }

    private BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
        return Expressions.numberTemplate(
                Double.class,
                ArticleFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                formatSearchKeyword(searchKeyword)
        ).gt(MINIMUM_MATCH_SCORE);
    }

    private String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(keyword -> String.format("+%s*", keyword.toLowerCase()))
                .collect(Collectors.joining(BLANK));
    }

    public static class ArticleFullTextSearchHQLFunction implements FunctionContributor {

        private static final String FUNCTION_NAME = "article_match_against";
        private static final String SQL_PATTERN = "match (title, summary, content) against (?1 in boolean mode)";

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
}
