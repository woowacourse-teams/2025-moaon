package moaon.backend.article.service;

import static org.assertj.core.api.Assertions.assertThat;

import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.repository.ArticleContentRepository;
import moaon.backend.fixture.Fixture;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class ArticleCrawlServiceTest {

    @Mock
    private ArticleContentRepository repository;
    @Mock
    private AiSummaryClient aiSummaryClient;
    @Mock
    private MemberRepository memberRepository;

    private ArticleCrawlService crawlService = new ArticleCrawlService(repository, aiSummaryClient, memberRepository);

    @DisplayName("하루 20번 초과 크롤링시 AI요약 없이 빈 summary를 반환한다.")
    @Test
    void crawlFail() {
        // given
        String url = "https://happysisyphe.tistory.com/52";
        Member member = Fixture.anyMember();
        for (int i = 0; i < 20; i++) {
            member.addCrawlCount();
        }

        //when - then
        ArticleCrawlResult crawlResult = crawlService.crawl(url, member);

        assertThat(crawlResult.summary()).isEmpty();
    }
}
