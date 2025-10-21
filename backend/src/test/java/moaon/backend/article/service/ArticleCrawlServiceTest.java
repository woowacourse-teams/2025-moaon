package moaon.backend.article.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import moaon.backend.article.repository.ArticleContentRepository;
import moaon.backend.fixture.Fixture;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.member.domain.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class ArticleCrawlServiceTest {

    @Mock
    private ArticleContentRepository repository;
    private ArticleCrawlService crawlService = new ArticleCrawlService(repository);

    @DisplayName("하루 20번 초과 크롤링시 실패한다.")
    @Test
    void crawlFail() {
        // given
        String url = "https://happysisyphe.tistory.com/52";
        Member member = Fixture.anyMember();
        for (int i = 0; i < 20; i++) {
            member.addCrawlCount();
        }

        //when - then
        assertThatThrownBy(() -> crawlService.crawl(url, member))
                .isInstanceOf(CustomException.class)
                .hasMessage(ErrorCode.ARTICLE_CRAWL_TIMES_OVER.getMessage());
    }
}
