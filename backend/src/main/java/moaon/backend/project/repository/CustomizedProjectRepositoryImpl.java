package moaon.backend.project.repository;

import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dao.ProjectDao;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.Projects;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private final ProjectDao projectDao;

    @Override
    public Projects findWithSearchConditions(ProjectQueryCondition condition) {
        int limit = condition.limit();
        List<String> techStackNames = condition.techStackNames();
        SearchKeyword search = condition.search();
        List<String> categoryNames = condition.categoryNames();

        FilteringIds filteringIds = FilteringIds.init();
        filteringIds = applyTechStacks(filteringIds, techStackNames);
        filteringIds = applyCategories(filteringIds, categoryNames);
        filteringIds = applySearch(filteringIds, search);

        if (filteringIds.hasEmptyResult()) {
            return Projects.empty(limit);
        }

        List<Project> projects = projectDao.findProjects(condition, filteringIds.getIds());
        return new Projects(projects, calculateTotalCount(filteringIds), limit);
    }

    private FilteringIds applyTechStacks(FilteringIds filteringIds, List<String> techStack) {
        if (filteringIds.hasEmptyResult() || CollectionUtils.isEmpty(techStack)) {
            return filteringIds;
        }

        Set<Long> projectIdsByTechStacks = projectDao.findProjectIdsByTechStacks(techStack);
        return filteringIds.addFilterResult(projectIdsByTechStacks);
    }

    private FilteringIds applyCategories(FilteringIds filteringIds, List<String> categories) {
        if (filteringIds.hasEmptyResult() || CollectionUtils.isEmpty(categories)) {
            return filteringIds;
        }

        Set<Long> projectIdsByCategories = projectDao.findProjectIdsByCategories(categories);
        return filteringIds.addFilterResult(projectIdsByCategories);
    }

    private FilteringIds applySearch(FilteringIds filteringIds, SearchKeyword keyword) {
        if (filteringIds.hasEmptyResult() || keyword == null || !keyword.hasValue()) {
            return filteringIds;
        }

        Set<Long> projectIdsBySearchKeyword = projectDao.findProjectIdsBySearchKeyword(keyword);
        return filteringIds.addFilterResult(projectIdsBySearchKeyword);
    }

    private long calculateTotalCount(FilteringIds filteringIds) {
        if (filteringIds.isEmpty()) {
            return projectDao.count();
        }

        return filteringIds.size();
    }
}
