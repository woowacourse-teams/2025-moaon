package moaon.backend.article.repository.querymodifier;

import static moaon.backend.techStack.domain.QTechStack.techStack;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.repository.QueryModifier;
import org.springframework.util.CollectionUtils;

@RequiredArgsConstructor
public class ArticleTechStacksModifier implements QueryModifier<Void, ArticleQueryCondition> {

    private final JPAQuery<?> query;
    private final BooleanBuilder whereBuilder;

    @Override
    public Void modify(ArticleQueryCondition condition) {
        List<String> techStackNames = condition.techStackNames();
        if (!CollectionUtils.isEmpty(techStackNames)) {
            whereBuilder.and(techStack.name.in(techStackNames));
            query.having(techStack.name.countDistinct().eq((long) techStackNames.size()));
        }

        return null;
    }
}
