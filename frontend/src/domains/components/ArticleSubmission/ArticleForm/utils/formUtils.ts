import { toast } from "@shared/components/Toast/toast";
import type { FormDataType } from "../../types";

export const createEmptyFormData = (): FormDataType => ({
  id: crypto.randomUUID(),
  address: "",
  title: "",
  description: "",
  sector: "all",
  topics: [],
  techStacks: [],
});

export const validateFormData = (formData: FormDataType) => {
  if (!formData.address) {
    toast.warning("아티클 주소를 입력해주세요.");
    return false;
  }
  if (!formData.title) {
    toast.warning("아티클 제목을 입력해주세요.");
    return false;
  }
  if (!formData.description) {
    toast.warning("아티클 내용을 입력해주세요.");
    return false;
  }
  if (formData.sector === "all") {
    toast.warning("직군을 선택해주세요.");
    return false;
  }
  if (formData.sector !== "nonTech" && formData.techStacks.length === 0) {
    toast.warning("기술스택을 하나 이상 선택해주세요.");
    return false;
  }
  if (formData.topics.length === 0) {
    toast.warning("주제를 하나 이상 선택해주세요.");
    return false;
  }
  return true;
};
