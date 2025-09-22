package moaon.backend.db;

import static java.util.Map.entry;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.BulkRequest;
import co.elastic.clients.elasticsearch.core.BulkResponse;
import co.elastic.clients.elasticsearch.core.bulk.BulkOperation;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.repository.ArticleDocumentRepository;
import moaon.backend.techStack.domain.TechStackField;
import moaon.backend.techStack.repository.TechStackRepository;
import net.datafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@Rollback(false)
@ActiveProfiles("local")
//@Disabled
public class DataGeneratorTest {

    // --- 설정값 ---
    public static final int ARTICLE_COUNT = 1_000_000;
    public static final int BATCH_SIZE = 2500;

    // 한글 텍스트 생성을 위해 Locale.KOREAN 사용
    private final Faker faker = new Faker(Locale.KOREAN);
    private final AtomicLong seq = new AtomicLong(1);

    @Autowired
    private ElasticsearchClient esClient;
    @Autowired
    private TechStackRepository techStackRepository;

    @Autowired
    private ArticleDocumentRepository articleDocumentRepository;

    @Test
    void one() {
        final var ts1 = new TechStackField(techStackRepository.findByName("java"));
        final var ts2 = new TechStackField(techStackRepository.findByName("mysql"));
        articleDocumentRepository.save(new ArticleDocument(
                "1234",
                "제목",
                "한줄요약",
                "내용",
                Sector.NON_TECH,
                Set.of(Topic.DATABASE, Topic.API_DESIGN),
                Set.of(ts1, ts2),
                50,
                LocalDateTime.now()
        ));
    }

    @Test
    public void insertArticles() throws Exception {
        final var tsfs = techStackRepository.findAll()
                .stream()
                .map(TechStackField::new)
                .toList();

        final var sectors = Sector.values();

        for (int i = 0; i < ARTICLE_COUNT; i += BATCH_SIZE) {
            int end = Math.min(i + BATCH_SIZE, ARTICLE_COUNT);

            List<BulkOperation> ops = new ArrayList<>();
            for (int j = i; j < end; j++) {
                Long id = seq.getAndIncrement();

                final var sector = sectors[faker.number().numberBetween(0, sectors.length)];
                final var topics = genTopics(sector);
                final var genedTsfs = genTechStackNames(faker.number().numberBetween(1, 10), tsfs);
                Map<String, Object> doc = Map.ofEntries(
                        entry("id", id),
                        entry("title", faker.lorem().sentence(5)),
                        entry("summary", faker.lorem().sentence(15)),
                        entry("content", faker.lorem().paragraph(10)),
                        entry("sector", sector),
                        entry("topics", topics),
                        entry("techStacks", genedTsfs),
                        entry("clicks", faker.number().numberBetween(0, 100_000)),
                        entry("createdAt",
                                DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS").format(
                                        faker.date().past(3 * 365, TimeUnit.DAYS).toLocalDateTime()))
                );
                /*
                {
  "id": "2",
  "title": "제목",
  "summary": "한줄요약",
  "content": "내용",
  "sector": "NON_TECH",
  "topics": [
    "API_DESIGN",
    "DATABASE"
  ],
  "techStacks": [
    {
      "id": "32",
      "name": "mysql"
    },
    {
      "id": "37",
      "name": "java"
    }
  ]
}
                 */

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

    private Collection<Topic> genTopics(final Sector sector) {
        final var sectorTopics = sector.getTopics();
        final var topics = new HashSet<Topic>();
        int count = faker.number().numberBetween(1, 4);
        for (int k = 0; k < count; k++) {
            Topic randomTopic;
            do {
                randomTopic = sectorTopics.get(faker.number().numberBetween(0, sectorTopics.size()));
            } while (topics.contains(randomTopic));
            topics.add(randomTopic);
        }

        return topics;
    }

    private Collection<TechStackField> genTechStackNames(final int count, final List<TechStackField> tsfs) {
        final var genedTsfs = new HashSet<TechStackField>();

        for (int k = 0; k < count; k++) {
            TechStackField tsf;
            do {
                final int i = faker.number().numberBetween(0, tsfs.size());
                tsf = tsfs.get(i);
            } while (genedTsfs.contains(tsf));
            genedTsfs.add(tsf);
        }

        return genedTsfs;
    }

}
