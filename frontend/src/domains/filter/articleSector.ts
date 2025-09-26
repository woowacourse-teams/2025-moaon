import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const ARTICLE_SECTOR_MAP = {
  all: {
    label: "전체",
    color: "#6c757d",
  },
  fe: {
    label: "프론트엔드",
    color: "#51c4dbff",
  },
  be: {
    label: "백엔드",
    color: "#7a7677ff",
  },
  android: {
    label: "안드로이드",
    color: "#27ae60",
  },
  ios: {
    label: "iOS",
    color: "#e74c3c",
  },
  infra: {
    label: "인프라",
    color: "#f39c12",
  },
  nonTech: {
    label: "비개발",
    color: "#d58756ff",
  },
} as const;

export type ArticleSectorKey = keyof typeof ARTICLE_SECTOR_MAP;
export const ARTICLE_SECTOR_ENTRY = typeSafeObjectEntries(ARTICLE_SECTOR_MAP);
export type ArticleSectorLabel =
  (typeof ARTICLE_SECTOR_ENTRY)[number][1]["label"];
