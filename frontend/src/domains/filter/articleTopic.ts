import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

const TECH_COMMON_TOPICS = {
  adoption: {
    label: "기술 도입",
  },
  trouble: {
    label: "트러블슈팅",
  },
  performance: {
    label: "성능 최적화",
  },
  etc: {
    label: "기타",
  },
};

const FE_TOPICS = {
  state: {
    label: "상태 관리",
  },
  uiux: {
    label: "UI/UX",
  },
  bundling: {
    label: "번들링",
  },
  testing: {
    label: "테스트",
  },
  code: {
    label: "코드 품질",
  },
  ...TECH_COMMON_TOPICS,
} as const;

const BE_TOPICS = {
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
  testing: {
    label: "테스트",
  },
  code: {
    label: "코드 품질",
  },
  ...TECH_COMMON_TOPICS,
} as const;

const ANDROID_TOPICS = {
  uiux: {
    label: "UI/UX",
  },
  build: {
    label: "빌드/배포",
  },
  native: {
    label: "네이티브 모듈",
  },
  sdk: {
    label: "SDK 연동",
  },
  architecture: {
    label: "아키텍처 설계",
  },
  testing: {
    label: "테스트",
  },
  code: {
    label: "코드 품질",
  },
  ...TECH_COMMON_TOPICS,
} as const;

const IOS_TOPICS = {
  uiux: {
    label: "UI/UX",
  },
  build: {
    label: "빌드/배포",
  },
  native: {
    label: "네이티브 모듈",
  },
  sdk: {
    label: "SDK 연동",
  },
  architecture: {
    label: "아키텍처 설계",
  },
  testing: {
    label: "테스트",
  },
  code: {
    label: "코드 품질",
  },
  ...TECH_COMMON_TOPICS,
} as const;

const INFRA_TOPICS = {
  cicd: {
    label: "CI/CD",
  },
  monitoring: {
    label: "모니터링/로깅",
  },
  security: {
    label: "보안",
  },
  network: {
    label: "네트워크",
  },
  ...TECH_COMMON_TOPICS,
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
  etc: {
    label: "기타",
  },
} as const;

export const ALL_TOPICS = {
  ...FE_TOPICS,
  ...BE_TOPICS,
  ...ANDROID_TOPICS,
  ...IOS_TOPICS,
  ...INFRA_TOPICS,
  ...NON_TECH_TOPICS,
} as const;

export type AllTopicKey = keyof typeof ALL_TOPICS;
export type AllTopicLabel = (typeof ALL_TOPICS)[AllTopicKey]["label"];

export const FRONTEND_TOPICS_ENTRY = typeSafeObjectEntries(FE_TOPICS);

export const BACKEND_TOPICS_ENTRY = typeSafeObjectEntries(BE_TOPICS);

export const ANDROID_TOPICS_ENTRY = typeSafeObjectEntries(ANDROID_TOPICS);

export const IOS_TOPICS_ENTRY = typeSafeObjectEntries(IOS_TOPICS);

export const INFRA_TOPICS_ENTRY = typeSafeObjectEntries(INFRA_TOPICS);

export const NON_TECH_TOPICS_ENTRY = typeSafeObjectEntries(NON_TECH_TOPICS);

export const ALL_TOPICS_ENTRY = typeSafeObjectEntries(ALL_TOPICS);
