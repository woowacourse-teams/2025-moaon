package moaon.backend.global.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import moaon.backend.global.elastic.IndexNameResolver;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ElasticsearchConfig {

    private final IndexNameResolver indexNameResolver;

    @PostConstruct
    public void registerArticleIndex() {
        indexNameResolver.register("Article", "articles");
    }
}