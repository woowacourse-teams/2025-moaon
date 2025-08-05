import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const PROJECT_CATEGORY_MAP = {
  web: {
    label: "웹",
  },
  app: {
    label: "앱",
  },
  game: {
    label: "게임",
  },
  education: {
    label: "교육",
  },
  finance: {
    label: "금융",
  },
  life: {
    label: "생활",
  },
  social: {
    label: "소셜",
  },
  ecommerce: {
    label: "쇼핑",
  },
  sports: {
    label: "스포츠",
  },
  entertainment: {
    label: "엔터테인먼트",
  },
  travel: {
    label: "여행",
  },
  it: {
    label: "IT",
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
