import { mutationOptions } from "@tanstack/react-query";
import getImagePresignedUrl from "./getImagePresignedUrl";
import postProjectImage from "./postProjectImage";
import postProjectRegister from "./postProjectRegister";
import type {
  getImagePresignedUrlResponse,
  PostProjectRegisterResponse,
  ProjectFormData,
  uploadProjectImageResponse,
} from "./postProjectRegister.type";

export const projectRegisterQueries = {
  all: ["projects"] as const,
  postProject: () =>
    mutationOptions<PostProjectRegisterResponse, Error, ProjectFormData>({
      mutationFn: (projectFormData) => postProjectRegister(projectFormData),
    }),
  getPresignedUrl: () =>
    mutationOptions<getImagePresignedUrlResponse[], Error, string[]>({
      mutationFn: (fileNames) => getImagePresignedUrl(fileNames),
    }),
  uploadProjectImage: () =>
    mutationOptions<string[], Error, uploadProjectImageResponse>({
      mutationFn: ({ response, files }) =>
        postProjectImage({ response, files }),
    }),
};
