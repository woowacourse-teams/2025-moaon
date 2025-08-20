import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const ARTICLE_CATEGORY_MAP = {
  all: {
    label: "전체",
    bgColor: "#6c757d",
  },
  fe: {
    label: "FE",
    bgColor: "#3498db",
  },
  be: {
    label: "BE",
    bgColor: "#27ae60",
  },
  android: {
    label: "Android",
    bgColor: "#f39c12",
  },
  ios: {
    label: "iOS",
    bgColor: "#e74c3c",
  },
  ss: {
    label: "소프트스킬",
    bgColor: "#47ccab",
  },
  etc: {
    label: "기타",
    bgColor: "#868888",
  },
} as const;

export type ArticleCategoryKey = keyof typeof ARTICLE_CATEGORY_MAP;
export const ARTICLE_CATEGORY_ENTRY =
  typeSafeObjectEntries(ARTICLE_CATEGORY_MAP);
export type ArticleCategoryLabel =
  (typeof ARTICLE_CATEGORY_ENTRY)[number][1]["label"];
