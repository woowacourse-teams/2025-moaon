package moaon.backend.article.repository.es;

import java.net.URI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

@Configuration
public class ElasticsearchConfig extends ElasticsearchConfiguration {

    @Value("${spring.elasticsearch.uris}")
    private String uris;

    @Override
    public ClientConfiguration clientConfiguration() {
        URI uri = URI.create(uris);
        String hostAndPort = uri.getHost() + ":" + uri.getPort();

        return ClientConfiguration.builder()
                .connectedTo(hostAndPort)
                .withConnectTimeout(300L)
                .withSocketTimeout(1_500L)
                .build();
    }
}
