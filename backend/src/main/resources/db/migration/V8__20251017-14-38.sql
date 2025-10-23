-- 목적: article_topics 테이블의 topics ENUM에 NATIVE, SDK, BUILD 추가

ALTER TABLE `article_topics`
    MODIFY COLUMN `topics` ENUM (
        'API_DESIGN',
        'ARCHITECTURE_DESIGN',
        'BUNDLING',
        'CI_CD',
        'CODE_QUALITY',
        'DATABASE',
        'DEPLOYMENT_AND_OPERATION',
        'DESIGN',
        'ETC',
        'MONITORING_AND_LOGGING',
        'NETWORK',
        'PERFORMANCE_OPTIMIZATION',
        'PLANNING',
        'RETROSPECTIVE',
        'SECURITY',
        'STATE_MANAGEMENT',
        'TEAM_CULTURE',
        'TECHNOLOGY_ADOPTION',
        'TESTING',
        'TROUBLESHOOTING',
        'UI_UX_IMPROVEMENT',
        'NATIVE',
        'SDK',
        'BUILD'
        ) NOT NULL;
