import { httpClient } from "../HttpClient";
import type {
  PostProjectRegisterResponse,
  ProjectFormData,
} from "./postProjectRegister.type";

const postProjectRegister = async (
  projectFormData: ProjectFormData
): Promise<PostProjectRegisterResponse> => {
  const response = await httpClient.post(`/projects/temp`, projectFormData);

  const result: PostProjectRegisterResponse = await response.json();
  return result;
};

export default postProjectRegister;
