import type { NavItem } from "../types/Header.types";

export const NAV_LIST: NavItem[] = [
  {
    id: 1,
    href: "/project",
    text: "프로젝트 탐색",
  },
  {
    id: 2,
    href: "/article",
    text: "아티클 탐색",
    subMenus: {
      paramsOptions: {
        key: "sector",
        mode: "single",
      },
      menus: [
        { key: "all", label: "전체" },
        { key: "fe", label: "프론트엔드" },
        { key: "be", label: "백엔드" },
        { key: "Android", label: "안드로이드" },
        { key: "ios", label: "IOS" },
        { key: "infra", label: "인프라" },
        { key: "nonTech", label: "비개발" },
      ],
    },
  },
];
