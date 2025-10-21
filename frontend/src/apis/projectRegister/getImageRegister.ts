import { httpClient } from "../HttpClient";
import type { PostProjectImageRegisterResponse } from "./postProjectRegister.type";

const postProjectImageRegister = async (
  fileNames: string[]
): Promise<PostProjectImageRegisterResponse[]> => {
  const queryString = new URLSearchParams(window.location.search);
  queryString.set("fileNames", fileNames.join(","));

  const response = await httpClient.get(
    `/s3/posturl?${queryString.toString()}`
  );

  const result: PostProjectImageRegisterResponse[] = await response.json();

  return result;
};

export default postProjectImageRegister;
