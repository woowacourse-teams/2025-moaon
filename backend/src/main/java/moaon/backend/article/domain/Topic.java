package moaon.backend.article.domain;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Topic {

    // 공통
    TECHNOLOGY_ADOPTION("technologyAdoption"),
    TROUBLESHOOTING("troubleShooting"),
    PERFORMANCE_OPTIMIZATION("performanceOptimization"),
    TESTING("testing"),
    CODE_QUALITY("codeQuality"),
    SECURITY("security"),
    ETC("etc"),

    // FE,
    STATE_MANAGEMENT("stateManagement"),
    UI_UX_IMPROVEMENT("uiUxImprovement"),
    BUNDLING("bundling"),

    // BE,
    ARCHITECTURE_DESIGN("architectureDesign"),
    API_DESIGN("apiDesign"),
    DATABASE("db"),
    DEPLOYMENT_AND_OPERATION("deploymentAndOperation"),

    // infra
    CI_CD("ciCd"),
    MONITORING_AND_LOGGING("monitoringAndLogging"),
    NETWORK("network"),

    // 비개발
    TEAM_CULTURE("teamCulture"),
    RETROSPECTIVE("retrospective"),
    PLANNING("planning"),
    DESIGN("design");

    // todo ios, android 추가

    private final String name;
}
