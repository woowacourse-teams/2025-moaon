package moaon.backend.project.repository;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.category.domain.Category;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectQueryCondition;
import moaon.backend.techStack.domain.TechStack;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Project> findWithSearchConditions(ProjectQueryCondition projectQueryCondition) {
        String search = projectQueryCondition.search();
        List<Platform> platforms = projectQueryCondition.platforms();
        List<Category> categories = projectQueryCondition.categories();
        List<Organization> organizations = projectQueryCondition.organizations();
        List<TechStack> techStacks = projectQueryCondition.techStacks();

        return jpaQueryFactory.selectFrom(project)
                .where(
                        toContainsSearch(search),
                        toContainsPlatform(platforms),
                        toContainsCategory(categories),
                        toContainsOrganization(organizations),
                        toContainsTechStacks(techStacks)
                )
                .fetch();
    }

    private BooleanBuilder toContainsSearch(String search) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (StringUtils.hasText(search)) {
            return booleanBuilder.or(project.title.contains(search)
                    .or(project.summary.contains(search))
                    .or(project.description.contains(search)));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsPlatform(List<Platform> platforms) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (platforms != null && !platforms.isEmpty()) {
            return booleanBuilder.and(project.platforms.any().in(platforms));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsCategory(List<Category> categories) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (categories != null && !categories.isEmpty()) {
            return booleanBuilder.and(project.categories.any().in(categories));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsOrganization(List<Organization> organizations) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (organizations != null && !organizations.isEmpty()) {
            return booleanBuilder.and(project.organization.in(organizations));
        }

        return booleanBuilder;
    }

    private BooleanBuilder toContainsTechStacks(List<TechStack> techStacks) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (techStacks != null && !techStacks.isEmpty()) {
            return booleanBuilder.and(project.techStacks.any().in(techStacks));
        }

        return booleanBuilder;
    }
}
