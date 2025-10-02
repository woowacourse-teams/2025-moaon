package moaon.backend.article.repository;

import java.util.HashSet;
import java.util.Set;
import lombok.Getter;

@Getter
public class FilteringIds {

    private final Set<Long> ids;
    private final boolean isInitialized;

    private FilteringIds(Set<Long> ids, boolean isInitialized) {
        this.ids = new HashSet<>(ids);
        this.isInitialized = isInitialized;
    }

    public static FilteringIds empty() {
        return new FilteringIds(Set.of(), false);
    }

    public static FilteringIds of(Set<Long> ids) {
        return new FilteringIds(ids, true);
    }

    public FilteringIds addFilterResult(Set<Long> newIds) {
        if (!isInitialized) {
            return FilteringIds.of(newIds);
        }
        return intersect(newIds);
    }

    private FilteringIds intersect(Set<Long> newIds) {
        if (this.hasEmptyResult() || newIds.isEmpty()) {
            return FilteringIds.of(Set.of());
        }

        ids.retainAll(newIds);
        return FilteringIds.of(ids);
    }

    public boolean hasEmptyResult() {
        return ids.isEmpty() && isInitialized;
    }

    public long size() {
        return ids.size();
    }

    public boolean isEmpty() {
        return ids.isEmpty();
    }
}
