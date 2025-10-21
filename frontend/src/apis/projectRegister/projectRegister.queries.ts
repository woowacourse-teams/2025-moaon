import { mutationOptions } from "@tanstack/react-query";
import postProjectImageRegister from "./getImageRegister";
import postProjectRegister from "./postProjectRegister";
import type {
  PostProjectImageRegisterResponse,
  PostProjectRegisterResponse,
  ProjectFormData,
} from "./postProjectRegister.type";

export const projectRegisterQueries = {
  all: ["projects"] as const,
  postProject: () =>
    mutationOptions<PostProjectRegisterResponse, Error, ProjectFormData>({
      mutationFn: (projectFormData) => postProjectRegister(projectFormData),
    }),
  postProjectImage: () =>
    mutationOptions<PostProjectImageRegisterResponse[], Error, string[]>({
      mutationFn: (fileNames) => postProjectImageRegister(fileNames),
    }),
};
