package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import moaon.backend.article.dao.ArticleDao;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.repository.db.CustomizedArticleRepositoryImpl;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import moaon.backend.fixture.Fixture;
import moaon.backend.fixture.ProjectArticleQueryConditionFixtureBuilder;
import moaon.backend.fixture.ProjectFixtureBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.domain.SearchKeyword;
import moaon.backend.project.domain.Project;
import moaon.backend.project.dto.ProjectArticleQueryCondition;
import moaon.backend.techStack.domain.TechStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import({RepositoryHelper.class, ArticleDao.class})
public class ArticleRepositorySearchTest {

    @Autowired
    private CustomizedArticleRepositoryImpl repository;

    @Autowired
    private RepositoryHelper repositoryHelper;

    @DisplayName("검색어로 모든 아티클을 조회한다.")
    @Test
    void findWithSearch() {
        // given
        Article webpack = repositoryHelper.save(new ArticleFixtureBuilder()
                .title("webpack config 설정")
                .summary("Webpack을 설치하고 설정을 진행하는 과정에서 발생한 이슈입니다.")
                .content("webpack.config.js의 resolve.extensions 배열에서 굳이 .js가 필요할까 하는 생각이 들어 해당 확장자를 제거했습니다.")
                .build()
        );
        Article ec2Docker = repositoryHelper.save(new ArticleFixtureBuilder()
                .title("EC2 도커 갑자기 안됨")
                .summary("오늘 아침 EC2 접근이 안돼서 들어가보니까 컨테이너가 실행이 안되고 있음.")
                .content("오류 로그의 No space left on device 메시지가 명확히 나타내듯, EC2 인스턴스의 디스크(스토리지) 공간이 가득 찼습니다.")
                .build()
        );
        Article runner = repositoryHelper.save(new ArticleFixtureBuilder()
                .title("runner 갑자기 오프라인")
                .summary("Github Actions Runner 상태가 갑자기 offline이 됨")
                .content("Runner가 offline된 이유는 일시적 네트워크 단절이 가장 유력하며, 디스크 부족이 간접적으로 영향을 줬을 가능성도 존재합니다.")
                .build()
        );

        // when
        List<Article> aboutWebpack = repository.findWithSearchConditions(aboutSearchKeyword("webpack")).getArticles();
        List<Article> aboutDisk = repository.findWithSearchConditions(aboutSearchKeyword("디스크")).getArticles();
        List<Article> aboutRunner = repository.findWithSearchConditions(aboutSearchKeyword("runner offline"))
                .getArticles();

        // then
        assertAll(
                () -> assertThat(aboutWebpack).containsOnlyOnce(webpack),
                () -> assertThat(aboutDisk).containsExactlyInAnyOrder(ec2Docker, runner),
                () -> assertThat(aboutRunner).containsOnlyOnce(runner)
        );
    }

    @DisplayName("검색어와 모든 필터를 조합하여 아티클을 조회한다.")
    @Test
    void findWithSearchAndAllFilters() {
        // given
        String searchKeyword = "React";
        TechStack techStack = Fixture.anyTechStack();
        Topic topic = Topic.TECHNOLOGY_ADOPTION;
        Sector sector = Sector.FE;

        Article matchingArticle = repositoryHelper.save(new ArticleFixtureBuilder()
                .title(searchKeyword)
                .techStacks(techStack)
                .topics(topic)
                .sector(sector)
                .build()
        );
        repositoryHelper.save(new ArticleFixtureBuilder()
                .title(searchKeyword)
                .techStacks(techStack)
                .topics(topic)
                .build()
        );
        repositoryHelper.save(new ArticleFixtureBuilder()
                .techStacks(techStack)
                .topics(topic)
                .sector(sector)
                .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .search(searchKeyword)
                .techStackNames(techStack.getName())
                .topics(topic)
                .sector(sector)
                .build();

        // when
        List<Article> articles = repository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).containsOnlyOnce(matchingArticle);
    }

    @DisplayName("검색어에 해당하는 결과가 없으면 빈 결과를 반환한다.")
    @Test
    void findWithNoSearchResult() {
        // given
        String nonExistentKeyword = "존재하지않는검색어12345";
        repositoryHelper.save(new ArticleFixtureBuilder().build());
        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .search(nonExistentKeyword)
                .build();

        // when
        List<Article> articles = repository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).isEmpty();
    }

    @DisplayName("검색어와 필터의 교집합 결과가 없으면 빈 결과를 반환한다.")
    @Test
    void findWithSearchAndFilterIntersectionEmpty() {
        // given
        String searchKeyword = "React";
        TechStack techStack = Fixture.anyTechStack();
        Topic topic = Topic.PERFORMANCE_OPTIMIZATION;

        repositoryHelper.save(new ArticleFixtureBuilder()
                .summary(searchKeyword)
                .topics(topic)
                .build()
        );
        repositoryHelper.save(new ArticleFixtureBuilder()
                .techStacks(techStack)
                .topics(topic)
                .build()
        );

        ArticleQueryCondition queryCondition = new ArticleQueryConditionBuilder()
                .search(searchKeyword)
                .techStackNames(techStack.getName())
                .topics(topic)
                .build();

        // when
        List<Article> articles = repository.findWithSearchConditions(queryCondition).getArticles();

        // then
        assertThat(articles).isEmpty();
    }

    @DisplayName("상세페이지에서 직군 필터와 검색어를 이용하여 아티클을 조회한다.")
    @Test
    void getByProjectIdAndSectorWithSearch() {
        // given
        Project project = repositoryHelper.save(new ProjectFixtureBuilder().build());
        Sector filteredSector = Sector.BE;
        String filteredSearch = "모아온";
        String unfilteredSearch = "핏토링";

        Article filterArticle1 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(project)
                        .sector(filteredSector)
                        .content(filteredSearch)
                        .build()
        );
        Article filterArticle2 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(project)
                        .sector(filteredSector)
                        .summary(filteredSearch)
                        .build()
        );
        Article filterArticle3 = repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(project)
                        .sector(filteredSector)
                        .title(filteredSearch)
                        .build()
        );

        repositoryHelper.save(
                new ArticleFixtureBuilder()
                        .project(project)
                        .sector(filteredSector)
                        .title(unfilteredSearch)
                        .build()
        );

        ProjectArticleQueryCondition condition = new ProjectArticleQueryConditionFixtureBuilder()
                .sector(filteredSector)
                .search(new SearchKeyword(filteredSearch))
                .build();

        // when
        List<Article> articles = repository.findAllByProjectIdAndCondition(project.getId(), condition);

        // then
        assertThat(articles).containsExactlyInAnyOrder(filterArticle1, filterArticle2, filterArticle3);
    }

    private ArticleQueryCondition aboutSearchKeyword(String keyword) {
        return new ArticleQueryConditionBuilder()
                .search(keyword)
                .build();
    }
}
