import { httpClient } from "../HttpClient";
import type {
  PostProjectRegisterResponse,
  ProjectFormData,
} from "./postProjectRegister.type";

const postProjectRegister = async (
  projectFormData: ProjectFormData
): Promise<PostProjectRegisterResponse> => {
  const response = await httpClient.post(`/projects`, projectFormData);

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "프로젝트 등록에 실패했습니다.");
  }

  const result: PostProjectRegisterResponse = await response.json();
  return result;
};

export default postProjectRegister;
