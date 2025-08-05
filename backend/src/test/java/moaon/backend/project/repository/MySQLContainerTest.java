package moaon.backend.project.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public abstract class MySQLContainerTest {

    @Container
    protected static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.4")
            .withDatabaseName("moaon")
            .withUsername("root")
            .withPassword("root");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //todo: DDL 하드코딩
    @BeforeEach
    protected void initializeFullTextIndex() {
        jdbcTemplate.execute(
                "ALTER TABLE project ADD FULLTEXT INDEX idx_project_fulltext (title, summary, description) WITH PARSER NGRAM"
        );
    }

    @AfterEach
    protected void dropFullTextIndex() {
        jdbcTemplate.execute("ALTER TABLE project DROP INDEX idx_project_fulltext");
    }

    @DynamicPropertySource
    private static void overrideProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mysqlContainer::getJdbcUrl);
        registry.add("spring.datasource.username", mysqlContainer::getUsername);
        registry.add("spring.datasource.password", mysqlContainer::getPassword);
        registry.add("spring.datasource.driver-class-name", mysqlContainer::getDriverClassName);
        registry.add("spring.jpa.properties.hibernate.dialect", () -> "org.hibernate.dialect.MySQL8Dialect");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "update");
    }
}
