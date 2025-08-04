import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const PROJECT_CATEGORY_MAP = {
  web: {
    label: "웹",
  },
  app: {
    label: "앱",
  },
  life: {
    label: "생활",
  },
  finance: {
    label: "금융/핀테크",
  },
  ecommerce: {
    label: "쇼핑/커머스",
  },
  education: {
    label: "교육/학습",
  },
  entertainment: {
    label: "엔터테인먼트/예술",
  },
  game: {
    label: "게임",
  },
  health: {
    label: "헬스케어/운동",
  },
  it: {
    label: "IT/테크",
  },
  social: {
    label: "소설",
  },
  sports: {
    label: "스포츠",
  },
  travel: {
    label: "여행/지도",
  },
  etc: {
    label: "기타",
  },
} as const;

export type ProjectCategoryKey = keyof typeof PROJECT_CATEGORY_MAP;
export const PROJECT_CATEGORY_ENTRY =
  typeSafeObjectEntries(PROJECT_CATEGORY_MAP);
export type ProjectCategoryLabel =
  (typeof PROJECT_CATEGORY_ENTRY)[number][1]["label"];
