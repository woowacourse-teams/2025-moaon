import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const ARTICLE_CATEGORY_MAP = {
  all: {
    label: "전체",
  },
  trouble: {
    label: "트러블슈팅",
  },
  tech: {
    label: "기술문서",
  },
  etc: {
    label: "기타",
  },
} as const;

export type ProjectCategoryKey = keyof typeof ARTICLE_CATEGORY_MAP;
export const ARTICLE_CATEGORY_ENTRY =
  typeSafeObjectEntries(ARTICLE_CATEGORY_MAP);
export type ArticleCategoryLabel =
  (typeof ARTICLE_CATEGORY_ENTRY)[number][1]["label"];
