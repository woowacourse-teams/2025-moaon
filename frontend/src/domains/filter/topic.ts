import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const COMMON_TOPIC = {
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
} as const;

export const FE_TOPIC = {
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

export const BE_TOPIC = {
  architecture: {
    label: "아키텍쳐 설계",
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

export const INFRA_TOPIC = {
  cicd: {
    label: "CI/CD",
  },
  monitoring: {
    label: "모니터링/로깅",
  },
  network: {
    label: "네트워크",
  },
} as const;

export const NON_TECH_TOPIC = {
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

export const TOPIC_MAP = {
  ...FE_TOPIC,
  ...BE_TOPIC,
  ...INFRA_TOPIC,
  ...NON_TECH_TOPIC,
  ...COMMON_TOPIC,
} as const;

export type CommonTopicKey = keyof typeof COMMON_TOPIC;
export type FrontendTopicKey = keyof typeof FE_TOPIC;
export type BackendTopicKey = keyof typeof BE_TOPIC;
export type InfraTopicKey = keyof typeof INFRA_TOPIC;
export type NonTechTopicKey = keyof typeof NON_TECH_TOPIC;

export type TopicKey =
  | CommonTopicKey
  | FrontendTopicKey
  | BackendTopicKey
  | InfraTopicKey
  | NonTechTopicKey;
export type TopicLabel = (typeof TOPIC_MAP)[keyof typeof TOPIC_MAP]["label"];

export const COMMON_TOPIC_ENTRY = typeSafeObjectEntries(COMMON_TOPIC);

export const FRONTEND_TOPIC_ENTRY = typeSafeObjectEntries(FE_TOPIC);

export const BACKEND_TOPIC_ENTRY = typeSafeObjectEntries(BE_TOPIC);

export const INFRA_TOPIC_ENTRY = typeSafeObjectEntries(INFRA_TOPIC);

export const NON_TECH_TOPIC_ENTRY = typeSafeObjectEntries(NON_TECH_TOPIC);

export const TOPIC_ENTRY = typeSafeObjectEntries(TOPIC_MAP);
