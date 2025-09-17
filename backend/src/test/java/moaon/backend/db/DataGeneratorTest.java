package moaon.backend.db;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import net.datafaker.Faker;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("local")
@Disabled
public class DataGeneratorTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 한글 텍스트 생성을 위해 Locale.KOREAN 사용
    private final Faker faker = new Faker(Locale.KOREAN);

    // --- 설정값 ---
    public static final int PROJECT_COUNT = 100_000;
    public static final int ARTICLE_COUNT = 1_000_000;
    public static final int BATCH_SIZE = 1000;

    /**
     * 테스트 실행 전 모든 관련 테이블의 데이터를 삭제합니다. TRUNCATE를 사용하여 빠르고 효율적으로 데이터를 초기화합니다.
     */
    @BeforeEach
    void cleanup() {
        System.out.println("데이터 초기화를 시작합니다...");
        // 외래 키 제약 조건을 잠시 비활성화하여 순서에 상관없이 TRUNCATE 실행
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0");

        jdbcTemplate.execute("TRUNCATE TABLE article_topics");
        jdbcTemplate.execute("TRUNCATE TABLE article_tech_stacks");
        jdbcTemplate.execute("TRUNCATE TABLE project_categories");
        jdbcTemplate.execute("TRUNCATE TABLE project_tech_stacks");
        jdbcTemplate.execute("TRUNCATE TABLE article");
        jdbcTemplate.execute("TRUNCATE TABLE project");

        System.out.println("✅ 데이터 초기화 완료");
    }

    @AfterEach
    void tearDown() {
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1");
    }

    @Test
    void generateLargeData() {
        // 0. 기준 정보 ID 조회
        List<Long> categoryIds = jdbcTemplate.queryForList("SELECT id FROM project_category", Long.class);
        List<Long> techStackIds = jdbcTemplate.queryForList("SELECT id FROM tech_stack", Long.class);
        String[] topics = Arrays.stream(Topic.values()).map(Topic::name).toArray(String[]::new);

        // 1. 프로젝트 생성
        System.out.println("Project 데이터 생성을 시작합니다...");
        List<Long> projectIds = generateProjects();
        System.out.println("✅ Project 데이터 생성 완료");

        // 2. 프로젝트 연관 테이블 생성
        System.out.println("Project 연관 데이터 생성을 시작합니다...");
        generateProjectLinks(projectIds, categoryIds, techStackIds);
        System.out.println("✅ Project 연관 데이터 생성 완료");

        // 3. 아티클 및 연관 테이블 생성
        System.out.println("Article 데이터 생성을 시작합니다...");
        generateArticlesAndLinksInBatches(projectIds, techStackIds, topics);
        System.out.println("✅ Article 및 연관 데이터 생성 완료");
    }

    private List<Long> generateProjects() {
        List<Long> allGeneratedIds = new ArrayList<>(PROJECT_COUNT);

        for (int i = 0; i < PROJECT_COUNT; i += BATCH_SIZE) {
            List<Object[]> batchArgs = new ArrayList<>();
            int end = Math.min(i + BATCH_SIZE, PROJECT_COUNT);
            for (int j = i; j < end; j++) {
                batchArgs.add(new Object[]{
                        1L,
                        faker.lorem().sentence(3), // title
                        faker.lorem().sentence(10), // summary
                        faker.lorem().paragraph(5), // content
                        "https://github.com/example/project",
                        "https://example.com",
                        faker.number().numberBetween(0, 100_000), // views
                        getRandomTimestampInLastThreeYears(),
                        getRandomTimestampInLastThreeYears()
                });
            }

            // 배치 업데이트 실행
            String sql = "INSERT INTO project (author_id, title, summary, description, github_url, production_url, views, created_at, updated_at) VALUES ";
            var sb = new StringBuilder(sql);
            for (Object[] batchArg : batchArgs) {
                sb.append("(")
                        .append(batchArg[0]).append(", ")
                        .append("'").append(batchArg[1]).append("', ")
                        .append("'").append(batchArg[2]).append("', ")
                        .append("'").append(batchArg[3]).append("', ")
                        .append("'").append(batchArg[4]).append("', ")
                        .append("'").append(batchArg[5]).append("', ")
                        .append(batchArg[6]).append(", ")
                        .append("'").append(batchArg[7]).append("', ")
                        .append("'").append(batchArg[8]).append("'")
                        .append("), ");
            }
            sb.delete(sb.length() - 2, sb.length());
            sb.append(";");
            jdbcTemplate.execute(sb.toString());

            // 생성된 ID를 가져오기 위해 현재 최대 ID를 기준으로 계산
            Long currentMaxId = jdbcTemplate.queryForObject("SELECT COALESCE(MAX(id), 0) FROM project", Long.class);
            if (currentMaxId != null) {
                for (int k = 0; k < batchArgs.size(); k++) {
                    allGeneratedIds.add(currentMaxId - batchArgs.size() + k + 1);
                }
            }

            System.out.printf("  -> Project %d / %d 생성 완료%n", end, PROJECT_COUNT);
        }
        return allGeneratedIds;
    }

    // ... generateProjectLinks 메소드는 변경 없음 ...
    private void generateProjectLinks(List<Long> projectIds, List<Long> categoryIds, List<Long> techStackIds) {
        System.out.println("  -> Project-Category 연관 관계 생성 중...");
        // Project Categories: 프로젝트당 1~2개 (중복 방지)
        for (int i = 0; i < projectIds.size(); i += BATCH_SIZE) {
            List<Object[]> categoryLinks = new ArrayList<>();
            int end = Math.min(i + BATCH_SIZE, projectIds.size());

            for (int j = i; j < end; j++) {
                Long projectId = projectIds.get(j);
                int count = faker.number().numberBetween(1, 3);
                Set<Long> usedCategoryIds = new HashSet<>();
                for (int k = 0; k < count; k++) {
                    Long randomCategoryId;
                    do {
                        randomCategoryId = categoryIds.get(faker.number().numberBetween(0, categoryIds.size()));
                    } while (usedCategoryIds.contains(randomCategoryId));
                    usedCategoryIds.add(randomCategoryId);
                    categoryLinks.add(new Object[]{projectId, randomCategoryId});
                }
            }

            String sql = "INSERT INTO project_categories (project_id, categories_id) VALUES ";
            var sb = new StringBuilder(sql);
            for (Object[] categoryLink : categoryLinks) {
                sb.append("(")
                        .append(categoryLink[0]).append(", ")
                        .append(categoryLink[1])
                        .append("), ");
            }
            sb.delete(sb.length() - 2, sb.length());
            sb.append(";");
            jdbcTemplate.execute(sb.toString());
            System.out.printf("    Project-Category: %d / %d 완료%n", end, projectIds.size());
        }
        System.out.println("  ✅ Project-Category 연관 관계 생성 완료");

        System.out.println("  -> Project-TechStack 연관 관계 생성 중...");
        // Project Tech Stacks: 프로젝트당 5~30개 (중복 방지)
        for (int i = 0; i < projectIds.size(); i += BATCH_SIZE) {
            List<Object[]> techStackLinks = new ArrayList<>();
            int end = Math.min(i + BATCH_SIZE, projectIds.size());

            for (int j = i; j < end; j++) {
                Long projectId = projectIds.get(j);
                int count = faker.number().numberBetween(5, 31);
                Set<Long> usedTechStackIds = new HashSet<>();
                for (int k = 0; k < count; k++) {
                    Long randomTechStackId;
                    do {
                        randomTechStackId = techStackIds.get(faker.number().numberBetween(0, techStackIds.size()));
                    } while (usedTechStackIds.contains(randomTechStackId));
                    usedTechStackIds.add(randomTechStackId);
                    techStackLinks.add(new Object[]{projectId, randomTechStackId});
                }
            }

            String sql = "INSERT INTO project_tech_stacks (project_id, tech_stacks_id) VALUES ";
            var sb = new StringBuilder(sql);
            for (Object[] techStackLink : techStackLinks) {
                sb.append("(")
                        .append(techStackLink[0]).append(", ")
                        .append(techStackLink[1])
                        .append("), ");
            }
            sb.delete(sb.length() - 2, sb.length());
            sb.append(";");
            jdbcTemplate.execute(sb.toString());
            System.out.printf("    Project-TechStack: %d / %d 완료%n", end, projectIds.size());
        }
        System.out.println("  ✅ Project-TechStack 연관 관계 생성 완료");
    }


    private void generateArticlesAndLinksInBatches(List<Long> projectIds, List<Long> techStackIds, String[] topics) {
        String[] sectors = Arrays.stream(Sector.values()).map(Sector::name).toArray(String[]::new);

        for (int i = 0; i < ARTICLE_COUNT; i += BATCH_SIZE) {
            List<Object[]> articleBatchArgs = new ArrayList<>();
            int end = Math.min(i + BATCH_SIZE, ARTICLE_COUNT);

            for (int j = i; j < end; j++) {
                String sector =
                        (j < 500) ? "BE" : (j < 700) ? "FE" : sectors[faker.number().numberBetween(0, sectors.length)];
                articleBatchArgs.add(new Object[]{
                        projectIds.get(faker.number().numberBetween(0, projectIds.size())),
                        faker.lorem().sentence(5),
                        faker.lorem().sentence(15),
                        faker.lorem().paragraph(10),
                        "https://example.com/article/" + (j + 1),
                        faker.number().numberBetween(0, 100_000),
                        getRandomTimestampInLastThreeYears(),
                        getRandomTimestampInLastThreeYears(),
                        sector
                });
            }

            // 배치 업데이트 실행
            String sql = "INSERT INTO article (project_id, title, summary, content, article_url, clicks, created_at, updated_at, sector) VALUES ";
            var sb = new StringBuilder(sql);
            for (Object[] batchArg : articleBatchArgs) {
                sb.append("(")
                        .append(batchArg[0]).append(", ")
                        .append("'").append(batchArg[1]).append("', ")
                        .append("'").append(batchArg[2]).append("', ")
                        .append("'").append(batchArg[3]).append("', ")
                        .append("'").append(batchArg[4]).append("', ")
                        .append(batchArg[5]).append(", ")
                        .append("'").append(batchArg[6]).append("', ")
                        .append("'").append(batchArg[7]).append("', ")
                        .append("'").append(batchArg[8]).append("'")
                        .append("), ");
            }
            sb.delete(sb.length() - 2, sb.length());
            sb.append(";");
            jdbcTemplate.execute(sb.toString());

            // 생성된 ID를 가져오기 위해 현재 최대 ID를 기준으로 계산
            Long currentMaxId = jdbcTemplate.queryForObject("SELECT COALESCE(MAX(id), 0) FROM article", Long.class);
            List<Long> generatedArticleIds = new ArrayList<>();
            if (currentMaxId != null) {
                for (int k = 0; k < articleBatchArgs.size(); k++) {
                    generatedArticleIds.add(currentMaxId - articleBatchArgs.size() + k + 1);
                }
            }

            generateArticleLinks(generatedArticleIds, techStackIds, topics);

            System.out.printf("  -> Article %d / %d 생성 완료%n", end, ARTICLE_COUNT);
        }
    }

    // ... generateArticleLinks 메소드는 변경 없음 ...
    private void generateArticleLinks(List<Long> articleIds, List<Long> allTechStackIds, String[] allTopics) {
        System.out.println("    -> Article-TechStack 연관 관계 생성 중...");
        // Article Tech Stacks: 아티클당 1~3개 (중복 방지)
        for (int i = 0; i < articleIds.size(); i += BATCH_SIZE) {
            List<Object[]> techStackLinks = new ArrayList<>();
            int end = Math.min(i + BATCH_SIZE, articleIds.size());

            for (int j = i; j < end; j++) {
                Long articleId = articleIds.get(j);
                int count = faker.number().numberBetween(1, 4);
                Set<Long> usedTechStackIds = new HashSet<>();
                for (int k = 0; k < count; k++) {
                    Long randomTechStackId;
                    do {
                        randomTechStackId = allTechStackIds.get(
                                faker.number().numberBetween(0, allTechStackIds.size()));
                    } while (usedTechStackIds.contains(randomTechStackId));
                    usedTechStackIds.add(randomTechStackId);
                    techStackLinks.add(new Object[]{articleId, randomTechStackId});
                }
            }

            String sql = "INSERT INTO article_tech_stacks (article_id, tech_stacks_id) VALUES ";
            var sb = new StringBuilder(sql);
            for (Object[] techStackLink : techStackLinks) {
                sb.append("(")
                        .append(techStackLink[0]).append(", ")
                        .append(techStackLink[1])
                        .append("), ");
            }
            sb.delete(sb.length() - 2, sb.length());
            sb.append(";");
            jdbcTemplate.execute(sb.toString());

            System.out.printf("      Article-TechStack: %d / %d 완료%n", end, articleIds.size());
        }
        System.out.println("    ✅ Article-TechStack 연관 관계 생성 완료");

        System.out.println("    -> Article-Topic 연관 관계 생성 중...");
        // Article Topics: 아티클당 1~3개 (중복 방지)
        for (int i = 0; i < articleIds.size(); i += BATCH_SIZE) {
            List<Object[]> topicLinks = new ArrayList<>();
            int end = Math.min(i + BATCH_SIZE, articleIds.size());

            for (int j = i; j < end; j++) {
                Long articleId = articleIds.get(j);
                int count = faker.number().numberBetween(1, 4);
                Set<String> usedTopics = new HashSet<>();
                for (int k = 0; k < count; k++) {
                    String randomTopic;
                    do {
                        randomTopic = allTopics[faker.number().numberBetween(0, allTopics.length)];
                    } while (usedTopics.contains(randomTopic));
                    usedTopics.add(randomTopic);
                    topicLinks.add(new Object[]{articleId, randomTopic});
                }
            }

            String sql = "INSERT INTO article_topics (article_id, topics) VALUES ";
            var sb = new StringBuilder(sql);
            for (Object[] topicLink : topicLinks) {
                sb.append("(")
                        .append(topicLink[0]).append(", ")
                        .append("'").append(topicLink[1]).append("'")
                        .append("), ");
            }
            sb.delete(sb.length() - 2, sb.length());
            sb.append(";");
            jdbcTemplate.execute(sb.toString());

            System.out.printf("      Article-Topic: %d / %d 완료%n", end, articleIds.size());
        }
        System.out.println("    ✅ Article-Topic 연관 관계 생성 완료");
    }


    private Timestamp getRandomTimestampInLastThreeYears() {
        return new Timestamp(faker.date().past(3 * 365, TimeUnit.DAYS).getTime());
    }
}
