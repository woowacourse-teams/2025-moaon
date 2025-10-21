import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";
import type { ProjectFormData } from "../../../../apis/projectRegister/postProjectRegister.type";

export type ProjectInfoFormErrors = Partial<{
  title: string;
  summary: string;
  description: string;
  techStacks: string;
  categories: string;
  githubUrl: string;
  productionUrl: string;
}>;

const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/;
const TITLE_MAX = 30;
const SUMMARY_MIN = 10;
const SUMMARY_MAX = 50;
const DESC_MIN = 100;
const DESC_MAX = 8000;
const TECHSTACK_MIN = 1;
const TECHSTACK_MAX = 40;
const CATEGORY_MIN = 1;
const CATEGORY_MAX = 5;
const URL_MAX = 255;
const URL_REGEX =
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const validateField = (
  field: keyof ProjectFormData,
  value: ProjectFormData[keyof ProjectFormData]
): string => {
  switch (field) {
    case "title": {
      const v = String(value ?? "");
      if (!v) return "프로젝트 제목을 입력해주세요.";
      if (v.length > TITLE_MAX)
        return `프로젝트 제목은 ${TITLE_MAX}자 이하로 입력해주세요.`;
      if (SPECIAL_CHAR_REGEX.test(v))
        return "프로젝트 제목에는 특수문자를 사용할 수 없습니다.";
      return "";
    }
    case "summary": {
      const v = String(value ?? "");
      if (!v) return "프로젝트 한 줄 소개를 입력해주세요.";
      if (v.length < SUMMARY_MIN || v.length > SUMMARY_MAX)
        return `한 줄 소개는 ${SUMMARY_MIN}자 이상 ${SUMMARY_MAX}자 이하로 입력해주세요.`;
      return "";
    }
    case "description": {
      const v = String(value ?? "");
      if (!v) return "프로젝트 개요를 입력해주세요.";
      if (v.length < DESC_MIN || v.length > DESC_MAX)
        return `프로젝트 개요는 ${DESC_MIN}자 이상 ${DESC_MAX}자 이하로 입력해주세요.`;
      return "";
    }
    case "techStacks": {
      const v = (value as TechStackKey[]) ?? [];
      if (v.length < TECHSTACK_MIN)
        return "프로젝트에 사용하신 기술스택을 하나 이상 선택해주세요.";
      if (v.length > TECHSTACK_MAX)
        return `기술스택은 최대 ${TECHSTACK_MAX}개까지 선택할 수 있습니다.`;
      if (new Set(v).size !== v.length)
        return "기술스택은 중복 선택할 수 없습니다.";
      return "";
    }
    case "categories": {
      const v = (value as ProjectCategoryKey[]) ?? [];
      if (v.length < CATEGORY_MIN) return "주제를 하나 이상 선택해주세요.";
      if (v.length > CATEGORY_MAX)
        return `주제는 최대 ${CATEGORY_MAX}개까지 선택할 수 있습니다.`;
      if (new Set(v).size !== v.length)
        return "주제는 중복 선택할 수 없습니다.";
      return "";
    }
    case "githubUrl": {
      const v = String(value ?? "");
      if (v && v.length > URL_MAX) {
        return "GitHub 주소는 255자 이하로 입력해주세요.";
      }
      if (v && !URL_REGEX.test(v)) {
        return "유효한 GitHub URL 형식이 아닙니다.";
      }
      return "";
    }
    case "productionUrl": {
      const v = String(value ?? "");
      if (v && v.length > URL_MAX) {
        return "서비스 주소는 255자 이하로 입력해주세요.";
      }
      if (v && !URL_REGEX.test(v)) {
        return "유효한 서비스 URL 형식이 아닙니다.";
      }
      return "";
    }
    default:
      return "";
  }
};

export const validateProjectInfoFormData = (
  formData: ProjectFormData
): ProjectInfoFormErrors => {
  const errors: ProjectInfoFormErrors = {};

  (
    [
      "title",
      "summary",
      "description",
      "techStacks",
      "categories",
      "githubUrl",
      "productionUrl",
    ] as const
  ).forEach((key) => {
    const msg = validateField(key, formData[key]);
    if (msg) errors[key] = msg;
  });

  return errors;
};
