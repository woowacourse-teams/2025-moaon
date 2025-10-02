package moaon.backend.article.repository;

import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.article.dao.ArticleDao;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Articles;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CustomizedArticleRepositoryImpl implements CustomizedArticleRepository {

    private final ArticleDao articleDao;

    @Override
    public Articles findWithSearchConditions(ArticleQueryCondition queryCondition) {
        List<String> techStackNames = queryCondition.techStackNames();
        List<Topic> topics = queryCondition.topics();
        SearchKeyword search = queryCondition.search();
        Sector sector = queryCondition.sector();
        int limit = queryCondition.limit();

        FilteringIds filteringIds = FilteringIds.empty();

        if (!CollectionUtils.isEmpty(techStackNames) && !filteringIds.hasEmptyResult()) {
            Set<Long> filterByTechstacks = articleDao.findIdsByTechStackNames(techStackNames);
            filteringIds = filteringIds.addFilterResult(filterByTechstacks);
            if (filterByTechstacks.isEmpty()) {
                return Articles.empty(limit);
            }
        }

        if (!CollectionUtils.isEmpty(topics) && !filteringIds.hasEmptyResult()) {
            Set<Long> filterByTopics = articleDao.findIdsByTopics(topics);
            filteringIds = filteringIds.addFilterResult(filterByTopics);
            if (filterByTopics.isEmpty()) { // 필터링 결과 0개
                return Articles.empty(limit);
            }
        }

        if (search != null && search.hasValue() && !filteringIds.hasEmptyResult()) {
            Set<Long> filterBySearch = articleDao.findIdsBySearchKeyword(search);
            filteringIds = filteringIds.addFilterResult(filterBySearch);
            if (filterBySearch.isEmpty()) {
                return Articles.empty(limit);
            }
        }

        if (sector != null && !filteringIds.hasEmptyResult()) {
            Set<Long> filterBySector = articleDao.findIdsBySector(sector, filteringIds.getIds());
            filteringIds = FilteringIds.of(filterBySector);
            if (filterBySector.isEmpty()) {
                return Articles.empty(limit);
            }
        }

        if (filteringIds.hasEmptyResult()) {
            return Articles.empty(limit);
        }

        List<Article> articles = articleDao.findAllBy(
                filteringIds.getIds(),
                queryCondition.cursor(),
                limit,
                queryCondition.sortType()
        );
        return new Articles(articles, calculateTotalCount(filteringIds), limit);
    }

    @Override
    public List<Article> findAllByProjectIdAndCondition(long id, ProjectArticleQueryCondition condition) {
        return articleDao.findAllBy(
                id,
                condition.sector(),
                condition.search()
        );
    }

    public FilteringIds applyTechStackFilter(FilteringIds filteringIds, List<String> techStackNames) {
        if (CollectionUtils.isEmpty(techStackNames)) {
            return filteringIds;
        }
        Set<Long> filterByTechstacks = articleDao.findIdsByTechStackNames(techStackNames);
        return filteringIds.addFilterResult(filterByTechstacks);
    }

    private long calculateTotalCount(FilteringIds filteringIds) {
        if (filteringIds.isEmpty()) {
            return articleDao.count();
        }
        return filteringIds.size();
    }
}
