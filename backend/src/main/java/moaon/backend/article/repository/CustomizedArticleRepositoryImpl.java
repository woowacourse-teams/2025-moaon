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
import moaon.backend.article.domain.Articles;
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
    public Articles findWithSearchConditions(ArticleQueryCondition queryCondition) {
        List<Long> articleIdsByTechStacks = articleDao.findIdsByTechStackNames(queryCondition.techStackNames());
        List<Long> articleIdsByTopics = articleDao.findIdsByTopics(queryCondition.topics());
        List<Long> articleIdsBySearch = articleDao.findIdsBySearchKeyword(queryCondition.search());
        List<Long> filteredIds = articleDao.findIdsBySector(
                queryCondition.sector(),
                intersect(
                        articleIdsByTechStacks,
                        articleIdsByTopics,
                        articleIdsBySearch
                )
        );
        List<Article> articles = articleDao.findAllBy(
                filteredIds,
                queryCondition.cursor(),
                queryCondition.limit(),
                queryCondition.sortType()
        );
        return new Articles(articles, calculateTotalCount(filteredIds), queryCondition.limit());
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

    private long calculateTotalCount(List<Long> articleIdsBySector) {
        if (articleIdsBySector.isEmpty()) {
            return articleDao.count();
        }
        return articleIdsBySector.size();
    }

    private Set<Long> intersect(List<Long>... idLists) {
        if (idLists == null || idLists.length == 0) {
            return Collections.emptySet();
        }

        List<List<Long>> nonNullLists = filterEmptyList(idLists);
        if (nonNullLists.isEmpty()) {
            return Collections.emptySet();
        }

        List<Long> smallestList = selectSmallestList(nonNullLists);
        return intersect(smallestList, nonNullLists);
    }

    private List<List<Long>> filterEmptyList(List<Long>[] idLists) {
        return Arrays.stream(idLists)
                .filter(Objects::nonNull)
                .filter(list -> !list.isEmpty())
                .toList();
    }

    private List<Long> selectSmallestList(List<List<Long>> nonNullLists) {
        return nonNullLists.stream()
                .min(Comparator.comparingInt(List::size))
                .orElse(Collections.emptyList());
    }

    private Set<Long> intersect(List<Long> base, List<List<Long>> others) {
        Set<Long> intersection = new HashSet<>(base);
        for (List<Long> current : others) {
            if (current != base) {
                intersection.retainAll(current);
            }
        }
        return intersection;
    }
}
