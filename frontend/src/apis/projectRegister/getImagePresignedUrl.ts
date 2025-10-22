import { httpClient } from "../HttpClient";
import type { getImagePresignedUrlResponse } from "./postProjectRegister.type";

const getImagePresignedUrl = async (
  fileNames: string[]
): Promise<getImagePresignedUrlResponse[]> => {
  const queryString = new URLSearchParams(window.location.search);
  queryString.set("fileNames", fileNames.join(","));

  const response = await httpClient.get(
    `/s3/posturl?${queryString.toString()}`
  );

  const result: getImagePresignedUrlResponse[] = await response.json();

  return result;
};

export default getImagePresignedUrl;
