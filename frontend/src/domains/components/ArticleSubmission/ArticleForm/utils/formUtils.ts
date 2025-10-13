import type { ArticleFormDataType } from "../../types";

export const createEmptyFormData = (): ArticleFormDataType => ({
  id: crypto.randomUUID(),
  address: "",
  title: "",
  description: "",
  sector: "all",
  topics: [],
  techStacks: [],
});

export const validateFormData = (formData: ArticleFormDataType) => {
  if (!formData.address) {
    return "아티클 주소를 입력해주세요.";
  }

  if (!formData.title) {
    return "아티클 제목을 입력해주세요.";
  }

  if (!formData.description) {
    return "아티클 내용을 입력해주세요.";
  }

  if (formData.sector === "all") {
    return "직군을 선택해주세요.";
  }

  if (formData.sector !== "nonTech" && formData.techStacks.length === 0) {
    return "기술스택을 하나 이상 선택해주세요.";
  }

  if (formData.topics.length === 0) {
    return "주제를 하나 이상 선택해주세요.";
  }

  return "";
};
