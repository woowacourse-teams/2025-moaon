import type { ArticleFormDataType } from "../../types";

export type ArticleFormErrors = Partial<{
  address: string;
  title: string;
  description: string;
  sectorValue: string;
  techStacks: string;
  topics: string;
}>;

const TITLE_MIN = 2;
const DESCRIPTION_MIN = 10;
const TECHSTACK_MAX = 3;
const TOPIC_MIN = 1;
const TOPIC_MAX = 3;
const URL_REGEX =
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const createEmptyFormData = (): ArticleFormDataType => ({
  id: crypto.randomUUID(),
  address: "",
  title: "",
  description: "",
  sector: {
    value: "all",
    topics: [],
    techStacks: [],
  },
});

export const validateField = (
  field: keyof ArticleFormErrors,
  value: string | number | string[],
  formData: ArticleFormDataType
): string => {
  switch (field) {
    case "address": {
      const v = String(value ?? "");
      if (!v) return "아티클 주소를 입력해주세요.";
      if (!URL_REGEX.test(v)) {
        return "유효한 URL 형식이 아닙니다.";
      }
      return "";
    }
    case "title": {
      const v = String(value ?? "");
      if (!v) return "아티클 제목을 입력해주세요.";
      if (v.length < TITLE_MIN) {
        return `아티클 제목은 최소 ${TITLE_MIN}자 이상이어야 합니다.`;
      }
      return "";
    }
    case "description": {
      const v = String(value ?? "");
      if (!v) return "아티클 내용을 입력해주세요.";
      if (v.length < DESCRIPTION_MIN) {
        return `아티클 내용은 최소 ${DESCRIPTION_MIN}자 이상이어야 합니다.`;
      }
      return "";
    }
    case "sectorValue": {
      const v = String(value ?? "");
      if (v === "all") return "직군을 선택해주세요.";
      return "";
    }
    case "techStacks": {
      const sectorValue = formData.sector.value;
      const techStacks = value as string[];

      if (sectorValue === "nonTech" || sectorValue === "all") {
        return "";
      }

      if (techStacks.length === 0) {
        return "기술스택을 하나 이상 선택해주세요.";
      }

      if (techStacks.length > TECHSTACK_MAX) {
        return `기술스택은 최대 ${TECHSTACK_MAX}개까지 선택할 수 있습니다.`;
      }

      return "";
    }
    case "topics": {
      const topics = value as string[];
      const sectorValue = formData.sector.value;

      if (sectorValue === "all") {
        return "";
      }

      if (topics.length < TOPIC_MIN) {
        return `주제를 최소 ${TOPIC_MIN}개 이상 선택해주세요.`;
      }

      if (topics.length > TOPIC_MAX) {
        return `주제는 최대 ${TOPIC_MAX}개까지 선택할 수 있습니다.`;
      }

      return "";
    }
    default:
      return "";
  }
};

export const validateFormData = (
  formData: ArticleFormDataType
): ArticleFormErrors => {
  const errors: ArticleFormErrors = {};

  const addressMsg = validateField("address", formData.address, formData);
  if (addressMsg) errors.address = addressMsg;

  const titleMsg = validateField("title", formData.title, formData);
  if (titleMsg) errors.title = titleMsg;

  const descMsg = validateField("description", formData.description, formData);
  if (descMsg) errors.description = descMsg;

  const sectorMsg = validateField(
    "sectorValue",
    formData.sector.value,
    formData
  );
  if (sectorMsg) errors.sectorValue = sectorMsg;

  const techStacksMsg = validateField(
    "techStacks",
    formData.sector.techStacks,
    formData
  );
  if (techStacksMsg) errors.techStacks = techStacksMsg;

  const topicsMsg = validateField("topics", formData.sector.topics, formData);
  if (topicsMsg) errors.topics = topicsMsg;

  return errors;
};
