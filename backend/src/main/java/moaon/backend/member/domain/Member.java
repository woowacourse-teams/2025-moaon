package moaon.backend.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id")
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String socialId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    // ! MySQL 이벤트 스케줄러로 매일 자정에 0으로 초기화합니다. !
    @Column(nullable = false)
    private int crawlCount = 0;

    public Member(String socialId, String email, String name) {
        this.socialId = socialId;
        this.email = email;
        this.name = name;
    }

    public int getTodayRemainingTokens() {
        return 20 - crawlCount;
    }

    public boolean isCrawlCountOvered() {
        return crawlCount >= 20;
    }

    public void addCrawlCount() {
        if (isCrawlCountOvered()) {
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_TIMES_OVER);
        }
        crawlCount++;
    }
}
