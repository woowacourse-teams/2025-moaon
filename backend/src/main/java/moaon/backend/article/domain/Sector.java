package moaon.backend.article.domain;

import static moaon.backend.article.domain.Topic.API_DESIGN;
import static moaon.backend.article.domain.Topic.ARCHITECTURE_DESIGN;
import static moaon.backend.article.domain.Topic.BUNDLING;
import static moaon.backend.article.domain.Topic.CI_CD;
import static moaon.backend.article.domain.Topic.CODE_QUALITY;
import static moaon.backend.article.domain.Topic.DATABASE;
import static moaon.backend.article.domain.Topic.DEPLOYMENT_AND_OPERATION;
import static moaon.backend.article.domain.Topic.DESIGN;
import static moaon.backend.article.domain.Topic.ETC;
import static moaon.backend.article.domain.Topic.MONITORING_AND_LOGGING;
import static moaon.backend.article.domain.Topic.NETWORK;
import static moaon.backend.article.domain.Topic.PERFORMANCE_OPTIMIZATION;
import static moaon.backend.article.domain.Topic.PLANNING;
import static moaon.backend.article.domain.Topic.RETROSPECTIVE;
import static moaon.backend.article.domain.Topic.SECURITY;
import static moaon.backend.article.domain.Topic.STATE_MANAGEMENT;
import static moaon.backend.article.domain.Topic.TEAM_CULTURE;
import static moaon.backend.article.domain.Topic.TECHNOLOGY_ADOPTION;
import static moaon.backend.article.domain.Topic.TESTING;
import static moaon.backend.article.domain.Topic.TROUBLESHOOTING;
import static moaon.backend.article.domain.Topic.UI_UX_IMPROVEMENT;

import java.util.Arrays;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Sector {

    FE("fe", List.of(
            TECHNOLOGY_ADOPTION,
            TROUBLESHOOTING,
            PERFORMANCE_OPTIMIZATION,
            TESTING,
            CODE_QUALITY,
            STATE_MANAGEMENT,
            UI_UX_IMPROVEMENT,
            BUNDLING,
            ETC
    )),
    BE("be", List.of(
            TECHNOLOGY_ADOPTION,
            TROUBLESHOOTING,
            PERFORMANCE_OPTIMIZATION,
            TESTING,
            CODE_QUALITY,
            SECURITY,
            ARCHITECTURE_DESIGN,
            API_DESIGN,
            DATABASE,
            DEPLOYMENT_AND_OPERATION,
            ETC
    )),
    ANDROID("android", List.of()),
    IOS("ios", List.of()),
    INFRA("infra", List.of(
            TECHNOLOGY_ADOPTION,
            TROUBLESHOOTING,
            PERFORMANCE_OPTIMIZATION,
            SECURITY,
            CI_CD,
            MONITORING_AND_LOGGING,
            NETWORK,
            ETC
    )),
    NON_TECH("nonTech", List.of(
            TEAM_CULTURE,
            RETROSPECTIVE,
            PLANNING,
            DESIGN,
            ETC
    ));

    private final String name;
    private final List<Topic> topics;

    public static Sector of(String name) {
        return Arrays.stream(Sector.values())
                .filter(sector -> sector.getName().equals(name))
                .findAny()
                .orElse(null);
    }
}
