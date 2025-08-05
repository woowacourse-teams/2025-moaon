import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const CATEGORY_MAP = {
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
    label: "소설",
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

export type CategoryKey = keyof typeof CATEGORY_MAP;
export const CATEGORY_ENTRY = typeSafeObjectEntries(CATEGORY_MAP);
export type CategoryLabel = (typeof CATEGORY_ENTRY)[number][1]["label"];
