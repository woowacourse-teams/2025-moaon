package moaon.backend.db;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.BulkRequest;
import co.elastic.clients.elasticsearch.core.BulkResponse;
import co.elastic.clients.elasticsearch.core.bulk.BulkOperation;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import net.datafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

@SpringBootTest
@Rollback(false)
public class DataGeneratorTest {

    // --- 설정값 ---
    public static final int ARTICLE_COUNT = 395_000;
    public static final int BATCH_SIZE = 5000;

    // 한글 텍스트 생성을 위해 Locale.KOREAN 사용
    private final Faker faker = new Faker(Locale.KOREAN);
    private final AtomicLong seq = new AtomicLong(605001);

    @Autowired
    private ElasticsearchClient esClient;

    @Test
    public void insertArticles() throws Exception {
        for (int i = 0; i < ARTICLE_COUNT; i += BATCH_SIZE) {
            int end = Math.min(i + BATCH_SIZE, ARTICLE_COUNT);

            List<BulkOperation> ops = new ArrayList<>();
            for (int j = i; j < end; j++) {
                Long id = seq.getAndIncrement();

                Map<String, Object> doc = Map.of(
                        "id", id,
                        "title", faker.lorem().sentence(5),
                        "summary", faker.lorem().sentence(15),
                        "content", faker.lorem().paragraph(10)
                );

                ops.add(BulkOperation.of(b -> b
                        .index(idx -> idx
                                .index("articles")
                                .id(id.toString())
                                .document(doc)
                        )
                ));
            }

            BulkRequest bulkRequest = BulkRequest.of(br -> br.operations(ops));
            BulkResponse response = esClient.bulk(bulkRequest);

            if (response.errors()) {
                response.items().forEach(item -> {
                    if (item.error() != null) {
                        System.err.println("Error indexing doc: " + item.error().reason());
                    }
                });
            }

            System.out.printf("  -> article %d / %d inserted%n", end, ARTICLE_COUNT);
            Thread.sleep(5);
        }
    }

}
