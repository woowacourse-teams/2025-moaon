package moaon.backend.project.repository;

import java.util.HashSet;
import java.util.Set;

public class FilteringIds {

    private final Set<Long> ids;
    private final boolean hasResult;

    public FilteringIds(Set<Long> ids, boolean hasResult) {
        this.ids = new HashSet<>(ids);
        this.hasResult = hasResult;
    }

    public static FilteringIds init() {
        return new FilteringIds(Set.of(), false);
    }

    public static FilteringIds of(Set<Long> ids) {
        return new FilteringIds(ids, true);
    }

    public FilteringIds addFilterResult(Set<Long> newIds) {
        if (!hasResult) {
            return FilteringIds.of(newIds);
        }

        return intersect(newIds);
    }

    private FilteringIds intersect(Set<Long> newIds) {
        if (this.hasEmptyResult() || newIds.isEmpty()) {
            return FilteringIds.of(Set.of());
        }

        Set<Long> intersection = new HashSet<>(ids);
        intersection.retainAll(newIds);
        return FilteringIds.of(intersection);
    }

    public boolean hasEmptyResult() {
        return ids.isEmpty() && hasResult;
    }

    public boolean isEmpty() {
        return ids.isEmpty();
    }

    public long size() {
        return ids.size();
    }
}
