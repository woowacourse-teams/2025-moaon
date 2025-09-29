package moaon.backend.project.repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.dao.ProjectDao;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;
import org.springframework.stereotype.Repository;

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

        Set<Long> projectIdsByFilter = findProjectIdsByFilter(techStackNames, search, categoryNames);
        List<Project> projects = projectDao.findProjects(condition, projectIdsByFilter);

        return new Projects(projects, countWithSearchCondition(condition, projectIdsByFilter), limit);
    }

    private long countWithSearchCondition(ProjectQueryCondition condition, Set<Long> projectsIdByFilter) {
        if (condition.isEmptyFilter()) {
            return projectDao.count();
        }

        return projectsIdByFilter.size();
    }

    private Set<Long> findProjectIdsByFilter(
            List<String> techStackNames,
            SearchKeyword searchKeyword,
            List<String> categoryNames
    ) {
        Set<Long> finalProjectIds = new HashSet<>();

        if (!techStackNames.isEmpty()) {
            finalProjectIds = projectDao.findProjectIdsByTechStacks(techStackNames);
        }
        filterCategories(categoryNames, finalProjectIds);
        filterSearch(searchKeyword, finalProjectIds);

        return finalProjectIds;
    }

    private void filterCategories(List<String> categoryNames, Set<Long> finalProjectIds) {
        if (!categoryNames.isEmpty()) {
            Set<Long> projectIdsByCategories = projectDao.findProjectIdsByCategories(categoryNames);

            if (finalProjectIds.isEmpty()) {
                finalProjectIds.addAll(projectIdsByCategories);
                return;
            }

            finalProjectIds.retainAll(projectIdsByCategories);
        }
    }

    private void filterSearch(SearchKeyword searchKeyword, Set<Long> finalProjectIds) {
        if (searchKeyword != null && searchKeyword.hasValue()) {
            Set<Long> projectIdsBySearchKeyword = projectDao.findProjectIdsBySearchKeyword(searchKeyword);

            if (finalProjectIds.isEmpty()) {
                finalProjectIds.addAll(projectIdsBySearchKeyword);
                return;
            }

            finalProjectIds.retainAll(projectIdsBySearchKeyword);
        }
    }
}
