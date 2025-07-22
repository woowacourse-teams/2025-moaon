package moaon.backend.project.dto;

import java.util.List;
import moaon.backend.category.domain.Category;
import moaon.backend.organization.domain.Organization;
import moaon.backend.platform.domain.Platform;
import moaon.backend.techStack.domain.TechStack;

public record ProjectQueryCondition(
        String search,
        List<Platform> platforms,
        List<Category> categories,
        List<Organization> organizations,
        List<TechStack> techStacks
) {
}
