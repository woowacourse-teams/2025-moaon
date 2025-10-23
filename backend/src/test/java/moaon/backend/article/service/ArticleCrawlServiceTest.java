package moaon.backend.article.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import moaon.backend.article.dto.ArticleCrawlResult;
import moaon.backend.article.repository.ArticleContentRepository;
import moaon.backend.member.domain.Member;
import moaon.backend.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

class ArticleCrawlServiceTest {

    private ArticleContentRepository repository = Mockito.mock(ArticleContentRepository.class);
    private AiSummaryClient aiSummaryClient = Mockito.mock(AiSummaryClient.class);
    private MemberRepository memberRepository = Mockito.mock(MemberRepository.class);

    private ArticleCrawlService crawlService = new ArticleCrawlService(repository, aiSummaryClient, memberRepository);

    @DisplayName("하루 20번 초과 크롤링시 AI요약 없이 빈 summary를 반환한다.")
    @Test
    void crawlFail() {
        // given
        String url = "https://happysisyphe.tistory.com/52";
        Member member = new Member(1L, "socialId", "abc@gmail.com", "poopo", 20);

        Mockito.when(memberRepository.findById(1L)).thenReturn(Optional.of(member));
        //when - then
        ArticleCrawlResult crawlResult = crawlService.crawl(url, member.getId());

        assertThat(crawlResult.summary()).isEmpty();
    }
}
