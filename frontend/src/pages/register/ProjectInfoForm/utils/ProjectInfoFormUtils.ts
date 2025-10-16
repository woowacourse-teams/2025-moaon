import type { ProjectFormData } from "../../../../apis/projectRegister/postProjectRegister.type";

export const validateProjectInfoFormData = (formData: ProjectFormData) => {
  const { title, summary, description, categories, techStacks } = formData;

  if (!title) {
    return "프로젝트 이름을 입력해주세요.";
  }

  if (!summary) {
    return "프로젝트 한줄소개를 입력해주세요.";
  }

  if (!description) {
    return "프로젝트 개요를 입력해주세요.";
  }
  if (techStacks.length === 0) {
    return "사용하신 기술스택을 하나 이상 선택해주세요.";
  }

  if (categories.length === 0) {
    return "주제를 하나 이상 선택해주세요.";
  }

  return "";
};
