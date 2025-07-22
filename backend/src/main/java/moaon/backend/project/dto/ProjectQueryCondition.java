package moaon.backend.project.dto;

import java.util.List;

public record ProjectQueryCondition(
        String search,
        List<String> platformNames,
        List<String> categoryNames,
        List<String> organizationNames,
        List<String> techStackNames
) {
}
