// TODO: imgUrl 속성 없애도 타입 오류가 나지 않도록 수정하기
export const CATEGORY_MAP = {
  education: {
    label: "교육/학습",
    imgUrl: "",
  },
  it: {
    label: "IT/테크",
    imgUrl: "",
  },
  game: {
    label: "게임",
    imgUrl: "",
  },
  entertainment: {
    label: "엔터테인먼트/예술",
    imgUrl: "",
  },
  travel: {
    label: "여행/지도",
    imgUrl: "",
  },
  social: {
    label: "소설",
    imgUrl: "",
  },
  health: {
    label: "헬스케어/운동",
    imgUrl: "",
  },
  life: {
    label: "생활",
    imgUrl: "",
  },
  finance: {
    label: "금융/핀테크",
    imgUrl: "",
  },
  sports: {
    label: "스포츠",
    imgUrl: "",
  },
  ecommerce: {
    label: "쇼핑/커머스",
    imgUrl: "",
  },
  etc: {
    label: "기타",
    imgUrl: "",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORY_MAP;
export const CATEGORY_ENTRY = Object.entries(CATEGORY_MAP);
export type CategoryEntry = (typeof CATEGORY_ENTRY)[number];
