package moaon.backend.article.repository;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.dao.ArticleDao;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Articles;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private final ArticleDao articleDao;

    @Override
    public Articles findWithSearchConditions(ArticleQueryCondition queryCondition) {
        Set<Long> articleIdsByTechStacks = intersectOrFallback(
                Collections.emptySet(),
                articleDao.findIdsByTechStackNames(queryCondition.techStackNames())
        );
        Set<Long> articleIdsTechStacksAndTopics = intersectOrFallback(
                articleIdsByTechStacks,
                articleDao.findIdsByTopics(queryCondition.topics())
        );
        Set<Long> articleIdsByTechStacksAndTopicsSearch = intersectOrFallback(
                articleIdsTechStacksAndTopics,
                articleDao.findIdsBySearchKeyword(queryCondition.search())
        );
        Set<Long> filteringIds = articleDao.findIdsBySector(
                queryCondition.sector(),
                articleIdsByTechStacksAndTopicsSearch
        );
        if (queryCondition.hasFilter() && filteringIds.isEmpty()) {
            return new Articles(Collections.emptyList(), 0, queryCondition.limit());
        }

        List<Article> articles = articleDao.findAllBy(
                filteringIds,
                queryCondition.cursor(),
                queryCondition.limit(),
                queryCondition.sortType()
        );
        return new Articles(articles, calculateTotalCount(filteringIds), queryCondition.limit());
    }

    @Override
    public List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition) {
        return articleDao.findAllBy(
                id,
                condition.sector(),
                condition.search()
        );
    }

    private long calculateTotalCount(Set<Long> filteringIds) {
        if (filteringIds.isEmpty()) {
            return articleDao.count();
        }
        return filteringIds.size();
    }

    private Set<Long> intersectOrFallback(Set<Long> first, Set<Long> second) {
        if (first.isEmpty() && second.isEmpty()) {
            return Collections.emptySet();
        }
        if (first.isEmpty()) {
            return second;
        }
        if (second.isEmpty()) {
            return first;
        }
        Set<Long> smaller = first.size() < second.size() ? first : second;
        Set<Long> larger = first.size() < second.size() ? second : first;
        Set<Long> result = new HashSet<>(smaller);
        result.retainAll(larger);
        return result;
    }
}
