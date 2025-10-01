package moaon.backend.article.repository;

import static moaon.backend.article.domain.QArticle.article;
import static moaon.backend.techStack.domain.QArticleTechStack.articleTechStack;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.dao.ArticleDao;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final ArticleDao articleDao;

    @Override
    public List<Article> findWithSearchConditions(ArticleQueryCondition queryCondition) {
        List<Long> articleIdsByTechStacks = articleDao.findArticleIdsByTechStackNames(queryCondition.techStackNames());
        List<Long> articleIdsByTopics = articleDao.findArticleIdsByTopics(queryCondition.topics());
        List<Long> articleIdsBySearch = articleDao.findArticleIdsBySearchKeyword(queryCondition.search());
        Set<Long> filteredIds = intersect(
                articleIdsByTechStacks,
                articleIdsByTopics,
                articleIdsBySearch
        );
        List<Long> articleIdsBySector = articleDao.findArticleIdsBySector(queryCondition.sector(), filteredIds);

        return articleDao.findArticles(articleIdsBySector, queryCondition);
    }

    @Override
    public long countWithSearchCondition(ArticleQueryCondition queryCondition) {
//        if (hasTechStackFilter(queryCondition)) {
//            return countWithTechStackFilter(queryCondition);
//        }
//
//        SearchKeyword searchKeyword = queryCondition.search();
//        Sector sector = queryCondition.sector();
//        List<Topic> topics = queryCondition.topics();
//
//        return Optional.ofNullable(jpaQueryFactory
//                        .select(article.count())
//                        .from(article)
//                        .where(
//                                equalSector(sector),
//                                satisfiesMatchScore(searchKeyword),
//                                containsAllTopics(topics)
//                        )
//                        .fetchOne())
//                .orElse(0L);
        return 0;
    }

    @Override
    public List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition) {
        SearchKeyword searchKeyword = condition.search();
        Sector sector = condition.sector();

        return jpaQueryFactory.
                selectFrom(article).distinct()
                .leftJoin(article.techStacks, articleTechStack)
                .where(
                        article.project.id.eq(id),
                        articleDao.equalSector(sector),
                        articleDao.satisfiesMatchScore(searchKeyword)
                )
                .fetch();
    }

    @SafeVarargs
    private Set<Long> intersect(List<Long>... idLists) {
        if (idLists == null || idLists.length == 0) {
            return Collections.emptySet();
        }

        return Arrays.stream(idLists)
                .filter(Objects::nonNull)
                .map(HashSet::new)
                .sorted(Comparator.comparingInt(Set::size))
                .reduce((first, second) -> {
                    first.retainAll(second);
                    return first;
                })
                .orElse(new HashSet<>());
    }
}
