package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleSortType;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.cursor.Cursor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private static final int FETCH_EXTRA_FOR_HAS_NEXT = 1;
    private static final double MINIMUM_MATCH_SCORE = 0.0;
    private static final String BLANK = " ";

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        List<Topic> topics = queryCondition.topics();
        List<String> techStackNames = queryCondition.techStackNames();
        ArticleSortType sortBy = queryCondition.sortBy();
        Cursor<?> articleCursor = queryCondition.articleCursor();
        int limit = queryCondition.limit();

        return jpaQueryFactory
                .selectFrom(article).distinct()
                .leftJoin(article.techStacks, techStack)
                .where(
                        equalSector(sector),
                        containsAllTopics(topics),
                        techStackNamesIn(techStackNames),
                        satisfiesMatchScore(searchKeyword),
                        applyCursor(articleCursor)
                )
                .having(hasExactTechStackCount(techStackNames))
//                .groupBy(article.id)
                .groupBy(article.createdAt, article.id)
                .orderBy(toOrderBy(sortBy))
                .limit(limit + FETCH_EXTRA_FOR_HAS_NEXT)
                .fetch();
    }

    @Override
    public long countWithSearchCondition(ArticleQueryCondition queryCondition) {
        SearchKeyword searchKeyword = queryCondition.search();
        Sector sector = queryCondition.sector();
        List<Topic> topics = queryCondition.topics();
        List<String> techStackNames = queryCondition.techStackNames();

        return jpaQueryFactory
                .select(article.countDistinct())
                .from(article)
                .leftJoin(article.techStacks, techStack)
                .where(
                        equalSector(sector),
                        containsAllTopics(topics),
                        techStackNamesIn(techStackNames),
                        satisfiesMatchScore(searchKeyword)
                )
                .having(hasExactTechStackCount(techStackNames))
                .groupBy(article.createdAt, article.id)
                .fetch()
                .size();
    }

    @Override
    public List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition) {
        SearchKeyword searchKeyword = condition.search();
        Sector sector = condition.sector();

        return jpaQueryFactory.
                selectFrom(article).distinct()
                .leftJoin(article.techStacks, techStack)
                .where(
                        article.project.id.eq(id),
                        equalSector(sector),
                        satisfiesMatchScore(searchKeyword)
                )
                .fetch();
    }

    private BooleanExpression equalSector(Sector sector) {
        if (sector == null) {
            return null;
        }
        return article.sector.eq(sector);
    }

    private BooleanExpression containsAllTopics(List<Topic> topics) {
        if (CollectionUtils.isEmpty(topics)) {
            return null;
        }
        return topics.stream()
                .map(article.topics::contains)
                .reduce(BooleanExpression::and)
                .orElse(null);
    }

    private BooleanExpression techStackNamesIn(List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return null;
        }
        return techStack.name.in(techStackNames);
    }

    private BooleanExpression hasExactTechStackCount(List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return null;
        }
        return techStack.name.countDistinct()
                .eq((long) techStackNames.size());
    }

    private BooleanExpression satisfiesMatchScore(SearchKeyword searchKeyword) {
        if (searchKeyword == null || !searchKeyword.hasValue()) {
            return null;
        }
        return Expressions.numberTemplate(
                        Double.class,
                        ArticleFullTextSearchHQLFunction.EXPRESSION_TEMPLATE,
                        formatSearchKeyword(searchKeyword)
                )
                .gt(MINIMUM_MATCH_SCORE);
    }

    private BooleanExpression applyCursor(Cursor<?> cursor) {
        if (cursor == null) {
            return null;
        }
        return cursor.getCursorExpression();
    }


    private String formatSearchKeyword(SearchKeyword searchKeyword) {
        String search = searchKeyword.replaceSpecialCharacters(BLANK);
        return Arrays.stream(search.split(BLANK))
                .map(this::applyBooleanModeExpression)
                .collect(Collectors.joining(BLANK));
    }

    private String applyBooleanModeExpression(String keyword) {
        if (keyword.length() == 1) {
            return String.format("%s*", keyword);
        }
        return String.format("+%s*", keyword.toLowerCase());
    }

    private OrderSpecifier<?>[] toOrderBy(ArticleSortType sortBy) {
        if (sortBy == ArticleSortType.CLICKS) {
            return new OrderSpecifier<?>[]{article.clicks.desc(), article.id.desc()};
        }

        return new OrderSpecifier<?>[]{article.createdAt.desc(), article.id.desc()};
    }
}
