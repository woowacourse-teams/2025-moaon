package moaon.backend.article.api.crawl.service;

import static org.assertj.core.api.Assertions.assertThat;

import moaon.backend.article.api.crawl.dto.ArticleCrawlResult;
import moaon.backend.article.api.crawl.service.client.AiSummaryClient;
import moaon.backend.article.repository.db.ArticleContentRepository;
import moaon.backend.member.domain.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class ArticleCrawlServiceTest {

    private final ArticleContentRepository repository = Mockito.mock(ArticleContentRepository.class);
    private final AiSummaryClient aiSummaryClient = Mockito.mock(AiSummaryClient.class);

    private final ArticleCrawlService crawlService = new ArticleCrawlService(repository, aiSummaryClient);

    @DisplayName("하루 20번 초과 크롤링시 AI요약 없이 빈 summary를 반환한다.")
    @Test
    void crawlFail() {
        // given
        String url = "https://happysisyphe.tistory.com/52";
        Member member = new Member(1L, "socialId", "abc@gmail.com", "poopo", 20);

        //when - then
        ArticleCrawlResult crawlResult = crawlService.crawl(url, member);

        assertThat(crawlResult.summary()).isEmpty();
    }
}
