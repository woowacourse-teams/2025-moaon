export const CATEGORY_MAP = {
  education: "교육/학습",
  it: "IT/테크",
  game: "게임",
  entertainment: "엔터테인먼트/예술",
  travel: "여행/지도",
  social: "소셜",
  health: "헬스케어/운동",
  life: "생활",
  finance: "금융/핀테크",
  sports: "스포츠",
  ecommerce: "쇼핑/커머스",
  etc: "기타",
} as const;

export type CategoryKey = keyof typeof CATEGORY_MAP;
