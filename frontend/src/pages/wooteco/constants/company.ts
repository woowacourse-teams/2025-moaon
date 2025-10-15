export const COMPANY_LIST = [
  "naver",
  "kakao",
  "line",
  "toss",
  "dangn",
  "woowa",
] as const;

export type Company = (typeof COMPANY_LIST)[number];

export const COMPANY_NAME: Record<Company, string> = {
  naver: "네이버",
  toss: "토스",
  kakao: "카카오",
  line: "라인",
  dangn: "당근마켓",
  woowa: "우아한형제들",
};
