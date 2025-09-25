import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const ARTICLE_SECTOR_MAP = {
  all: {
    label: "전체",
    bgColor: "#6c757d",
  },
  fe: {
    label: "프론트엔드",
    bgColor: "#3498db",
  },
  be: {
    label: "백엔드",
    bgColor: "#27ae60",
  },
  android: {
    label: "안드로이드",
    bgColor: "#f39c12",
  },
  ios: {
    label: "iOS",
    bgColor: "#e74c3c",
  },
  infra: {
    label: "인프라",
    bgColor: "#47ccab",
  },
  nonTech: {
    label: "비개발",
    bgColor: "#868888",
  },
} as const;

export type ArticleSectorKey = keyof typeof ARTICLE_SECTOR_MAP;
export const ARTICLE_SECTOR_ENTRY = typeSafeObjectEntries(ARTICLE_SECTOR_MAP);
export type ArticleSectorLabel =
  (typeof ARTICLE_SECTOR_ENTRY)[number][1]["label"];
