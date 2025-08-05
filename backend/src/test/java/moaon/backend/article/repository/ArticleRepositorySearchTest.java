package moaon.backend.article.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.fixture.ArticleFixtureBuilder;
import moaon.backend.fixture.ArticleQueryConditionBuilder;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.project.repository.MySQLContainerTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(RepositoryHelper.class)
public class ArticleRepositorySearchTest extends MySQLContainerTest {

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
        Article ec2 = repositoryHelper.save(new ArticleFixtureBuilder()
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
        List<Article> aboutWebpack = repository.findWithSearchConditions(aboutSearchKeyword("webpack"));
        List<Article> aboutDisk = repository.findWithSearchConditions(aboutSearchKeyword("디스크"));
        List<Article> aboutRunner = repository.findWithSearchConditions(aboutSearchKeyword("runner offline"));

        // then
        assertAll(
                () -> assertThat(aboutWebpack).containsOnlyOnce(webpack),
                () -> assertThat(aboutDisk).containsExactlyInAnyOrder(ec2, runner),
                () -> assertThat(aboutRunner).containsOnlyOnce(runner)
        );
    }

    private ArticleQueryCondition aboutSearchKeyword(String keyword) {
        return new ArticleQueryConditionBuilder()
                .search(keyword)
                .build();
    }
}
