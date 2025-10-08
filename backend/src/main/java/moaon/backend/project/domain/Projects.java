package moaon.backend.project.domain;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.cursor.Cursor;

@RequiredArgsConstructor
@Getter
public class Projects {

    private final List<Project> projects;
    private final long count;
    private final int limit;

    public List<Project> getProjectsToReturn() {
        if (hasNext()) {
            return projects.subList(0, limit);
        }

        return projects;
    }

    public Cursor<?> getNextCursor(ProjectSortType sortType) {
        if (hasNext()) {
            List<Project> projectsToReturn = getProjectsToReturn();
            Project lastProject = projectsToReturn.getLast();
            return sortType.toCursor(lastProject);
        }

        return null;
    }

    public boolean hasNext() {
        return projects.size() > limit;
    }
}
