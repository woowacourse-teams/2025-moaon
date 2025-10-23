export const COMPANY_LIST = [
  "naver",
  "kakao",
  "line",
  "woowa",
  "dangn",
  "toss",
] as const;

export type Company = (typeof COMPANY_LIST)[number];

export const COMPANY_NAME: Record<Company, string> = {
  naver: "네이버",
  kakao: "카카오",
  line: "라인",
  woowa: "우아한형제들",
  dangn: "당근마켓",
  toss: "토스",
};
