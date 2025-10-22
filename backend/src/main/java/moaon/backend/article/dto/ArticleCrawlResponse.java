package moaon.backend.article.dto;

import moaon.backend.member.domain.Member;

public record ArticleCrawlResponse(
        String title,
        String summary,
        int remainingToken
) {

    public static ArticleCrawlResponse from(ArticleCrawlResult crawlResult, Member member) {
        return new ArticleCrawlResponse(
                crawlResult.title(),
                crawlResult.summary(),
                member.getTodayRemainingTokens()
        );
    }
}
