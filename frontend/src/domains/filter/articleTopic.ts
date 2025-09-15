const TECH_COMMON_TOPICS = {
  adoption: {
    label: "기술 도입",
  },
  trouble: {
    label: "트러블슈팅",
  },
  performance: {
    label: "성능 개선",
  },
  testing: {
    label: "테스트",
  },
  code: {
    label: "코드 품질",
  },
  etc: {
    label: "기타",
  },
};

const FE_TOPICS = {
  ...TECH_COMMON_TOPICS,
  state: {
    label: "상태 관리",
  },
  uiux: {
    label: "UI/UX",
  },
  bundling: {
    label: "번들링",
  },
} as const;

const BE_TOPICS = {
  ...TECH_COMMON_TOPICS,
  security: {
    label: "보안",
  },
  architecture: {
    label: "아키텍처 설계",
  },
  api: {
    label: "API 설계",
  },
  db: {
    label: "DB",
  },
  deployment: {
    label: "배포/운영",
  },
} as const;

const INFRA_TOPICS = {
  security: {
    label: "보안",
  },
  cicd: {
    label: "CI/CD",
  },
  monitoring: {
    label: "모니터링/로깅",
  },
  etc: {
    label: "기타",
  },
} as const;

const NON_TECH_TOPICS = {
  culture: {
    label: "팀 문화",
  },
  retrospective: {
    label: "회고",
  },
  planning: {
    label: "기획",
  },
  design: {
    label: "디자인",
  },
} as const;

const ALL_TOPICS = {
  ...FE_TOPICS,
  ...BE_TOPICS,
  ...INFRA_TOPICS,
  ...NON_TECH_TOPICS,
} as const;

export type AllTopicKey = keyof typeof ALL_TOPICS;
