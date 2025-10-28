package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;

import moaon.backend.article.dao.ArticleDao;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.repository.db.ArticleDBRepository;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.project.dao.ProjectDao;
import moaon.backend.project.domain.Project;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({RepositoryHelper.class, QueryDslConfig.class, ArticleDao.class, ProjectDao.class})
class ArticleDBRepositoryTest {

    @Autowired
    private ArticleDBRepository repository;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @DisplayName("프로젝트 아이디와 직군으로 필터링한 아티클 개수를 반환한다.")
    @Test
    void countByProjectIdAndSector() {
        //given
        Sector filteredSector = Sector.BE;
        Sector udFilteredSector = Sector.FE;

        Project filteredProject = new ProjectFixtureBuilder().build();
        Project unFilteredProject = new ProjectFixtureBuilder().build();

        Article filteredArticle1 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(filteredProject)
                        .sector(filteredSector)
                        .build()
        );
        Article filteredArticle2 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(filteredProject)
                        .sector(filteredSector)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(unFilteredProject)
                        .sector(filteredSector)
                        .build()
        );
        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(filteredProject)
                        .sector(udFilteredSector)
                        .build()
        );

        // when
        Long count = repository.countByProjectIdAndSector(
                filteredProject.getId(),
                filteredSector
        );

        // then
        assertThat(count).isEqualTo(2);
    }
}
