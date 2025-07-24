// TODO: imgUrl 속성 없애도 타입 오류가 나지 않도록 수정하기
export const ORGANIZATION_MAP = {
  woowacourse: {
    label: "우아한테크코스",
    imgUrl: "",
  },
  boostcamp: {
    label: "부스트캠프",
    imgUrl: "",
  },
  ssafy: {
    label: "SSAFY",
    imgUrl: "",
  },
  swm: {
    label: "소프트웨어 마에스트로",
    imgUrl: "",
  },
};

export type OrganizationKey = keyof typeof ORGANIZATION_MAP;
export const ORGANIZATION_ENTRY = Object.entries(ORGANIZATION_MAP);
export type OrganizationEntry = (typeof ORGANIZATION_ENTRY)[number];
