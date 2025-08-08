import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const ARTICLE_CATEGORY_MAP = {
  all: {
    label: "전체",
    bgColor: "#d9d9d9",
  },
  trouble: {
    label: "트러블슈팅",
    bgColor: "#ee7777ff",
  },
  tech: {
    label: "기술문서",
    bgColor: "#48a235",
  },
  etc: {
    label: "기타",
    bgColor: "#619ecbff",
  },
} as const;

export type ArticleCategoryKey = keyof typeof ARTICLE_CATEGORY_MAP;
export const ARTICLE_CATEGORY_ENTRY = typeSafeObjectEntries(ARTICLE_CATEGORY_MAP);
export type ArticleCategoryLabel = (typeof ARTICLE_CATEGORY_ENTRY)[number][1]["label"];
