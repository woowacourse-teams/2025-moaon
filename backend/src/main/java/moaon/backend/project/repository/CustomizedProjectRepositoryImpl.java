package moaon.backend.project.repository;

import com.querydsl.jpa.JPQLQuery;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.dao.ProjectDao;
import moaon.backend.project.dao.ProjectIds;
import moaon.backend.project.domain.Project;
import moaon.backend.project.domain.ProjectCategory;
import moaon.backend.project.domain.Projects;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.techStack.domain.ProjectTechStack;
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

//        ProjectIds projectIds = ProjectIds.init();
//        projectIds = applyTechStacks(projectIds, techStackNames);
//        projectIds = applyCategories(projectIds, categoryNames);
//        projectIds = applySearch(projectIds, search);
//
//        if (projectIds.hasEmptyResult()) {
//            return Projects.empty(limit);
//        }
//
//        List<Long> ids = projectIds.getProjectIds();
//        List<Project> projects = projectDao.findProjects(condition, ids);
//        return new Projects(projects, calculateTotalCount(ids), limit);
    }

    @Override
    public List<ProjectCategory> findProjectCategoriesByProjectId(Long id) {
        return projectDao.findProjectCategoriesByProjectId(id);
    }

    @Override
    public List<ProjectTechStack> findProjectTechStacksByProjectId(Long id) {
        return projectDao.findProjectTechStacksByProjectId(id);
    }

    @Override
    public Project findProjectWithMemberJoin(Long id) {
        return projectDao.findProjectById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));
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

    private ProjectIds applyTechStacks(ProjectIds projectIds, List<String> techStack) {
        if (projectIds.hasEmptyResult() || CollectionUtils.isEmpty(techStack)) {
            return projectIds;
        }

        JPQLQuery<Long> ids = projectDao.findProjectIdsByTechStacks(projectIds, techStack);
        return ProjectIds.of(ids);
    }

    private ProjectIds applyCategories(ProjectIds projectIds, List<String> categories) {
        if (projectIds.hasEmptyResult() || CollectionUtils.isEmpty(categories)) {
            return projectIds;
        }

        JPQLQuery<Long> ids = projectDao.findProjectIdsByCategories(projectIds, categories);
        return ProjectIds.of(ids);
    }

    private ProjectIds applySearch(ProjectIds projectIds, SearchKeyword keyword) {
        if (projectIds.hasEmptyResult() || keyword == null || !keyword.hasValue()) {
            return projectIds;
        }

        JPQLQuery<Long> ids = projectDao.findProjectIdsBySearchKeyword(projectIds, keyword);
        return ProjectIds.of(ids);
    }

    private long calculateTotalCount(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return projectDao.count();
        }

        return ids.size();
    }
}
