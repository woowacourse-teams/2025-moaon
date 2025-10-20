import type { ProjectFormData } from "../../../../apis/projectRegister/postProjectRegister.type";

const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/;
const URL_MAX_LENGTH = 255;

export const validateProjectInfoFormData = (formData: ProjectFormData) => {
  const {
    title,
    summary,
    description,
    categories,
    techStacks,
    githubUrl,
    productionUrl,
  } = formData;

  if (!title) {
    return "프로젝트 이름을 입력해주세요.";
  }
  if (title.length < 2 || title.length > 30) {
    return "프로젝트 제목은 2자 이상 30자 이하로 입력해주세요.";
  }
  if (SPECIAL_CHAR_REGEX.test(title)) {
    return "프로젝트 제목에는 특수문자를 사용할 수 없습니다.";
  }

  if (!summary) {
    return "프로젝트 한 줄 소개를 입력해주세요.";
  }
  if (summary.length < 10 || summary.length > 50) {
    return "한 줄 소개는 10자 이상 50자 이하로 입력해주세요.";
  }

  if (!description) {
    return "프로젝트 개요를 입력해주세요.";
  }
  if (description.length < 100 || description.length > 8000) {
    return "프로젝트 개요는 100자 이상 8000자 이하로 입력해주세요.";
  }

  if (techStacks.length === 0) {
    return "사용하신 기술스택을 하나 이상 선택해주세요.";
  }
  if (techStacks.length > 40) {
    return "기술스택은 최대 40개까지 선택할 수 있습니다.";
  }

  if (categories.length === 0) {
    return "주제를 하나 이상 선택해주세요.";
  }
  if (categories.length > 5) {
    return "주제는 최대 5개까지 선택할 수 있습니다.";
  }

  if (githubUrl && githubUrl.length > URL_MAX_LENGTH) {
    return "GitHub 주소는 255자 이하로 입력해주세요.";
  }

  if (productionUrl && productionUrl.length > URL_MAX_LENGTH) {
    return "서비스 주소는 255자 이하로 입력해주세요.";
  }

  return "";
};
