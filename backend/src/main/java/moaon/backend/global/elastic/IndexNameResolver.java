package moaon.backend.global.elastic;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class IndexNameResolver {

    private final Map<String, String> indexNameMap = new ConcurrentHashMap<>();

    public void register(String eventType, String indexName) {
        indexNameMap.put(eventType, indexName);
    }

    public String getIndexName(String eventType) {
        String indexName = indexNameMap.get(eventType);
        if (indexName == null) {
            throw new IllegalArgumentException();
        }
        return indexName;
    }
}