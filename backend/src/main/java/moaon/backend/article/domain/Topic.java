package moaon.backend.article.domain;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Topic {

    // 공통
    TECHNOLOGY_ADOPTION("adoption"),
    TROUBLESHOOTING("trouble"),
    PERFORMANCE_OPTIMIZATION("performance"),
    TESTING("testing"),
    CODE_QUALITY("code"),
    SECURITY("security"),
    ETC("etc"),

    // FE,
    STATE_MANAGEMENT("state"),
    UI_UX_IMPROVEMENT("uiux"),
    BUNDLING("bundling"),

    // BE,
    ARCHITECTURE_DESIGN("architecture"),
    API_DESIGN("api"),
    DATABASE("db"),
    DEPLOYMENT_AND_OPERATION("deployment"),

    // infra
    CI_CD("cicd"),
    MONITORING_AND_LOGGING("monitoring"),
    NETWORK("network"),

    // 비개발
    TEAM_CULTURE("teamCulture"),
    RETROSPECTIVE("retrospective"),
    PLANNING("planning"),
    DESIGN("design");

    // todo ios, android 추가

    private final String name;

    public static Topic of(String name) {
        return Arrays.stream(Topic.values())
                .filter(topic -> topic.getName().equals(name))
                .findAny()
                .orElse(null);
    }
}
