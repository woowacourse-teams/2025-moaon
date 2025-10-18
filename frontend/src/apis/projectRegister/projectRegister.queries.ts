import { mutationOptions } from "@tanstack/react-query";
import postProjectRegister from "./postProjectRegister";
import type {
  PostProjectRegisterResponse,
  ProjectFormData,
} from "./postProjectRegister.type";

export const projectRegisterQueries = {
  all: ["projects"] as const,
  postProject: () =>
    mutationOptions<PostProjectRegisterResponse, Error, ProjectFormData>({
      mutationFn: (projectFormData) => postProjectRegister(projectFormData),
    }),
};
