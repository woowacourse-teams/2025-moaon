package moaon.backend.project.dao;

import com.querydsl.jpa.JPQLQuery;
import java.util.Collections;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectIds {

    private final JPQLQuery<Long> ids;
    private final boolean hasResult;

    public ProjectIds(JPQLQuery<Long> ids, boolean hasResult) {
        this.ids = ids;
        this.hasResult = hasResult;
    }

    public static ProjectIds init() {
        return new ProjectIds(null, false);
    }

    public static ProjectIds of(JPQLQuery<Long> ids) {
        return new ProjectIds(ids, true);
    }

    public List<Long> getProjectIds() {
        if (ids == null) {
            return Collections.emptyList();
        }

        return ids.fetch();
    }

    public boolean hasEmptyResult() {
        return ids == null && hasResult;
    }
}
