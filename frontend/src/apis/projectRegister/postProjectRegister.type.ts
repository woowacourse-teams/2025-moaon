import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ProjectFormData {
  title: string;
  summary: string;
  githubUrl?: string;
  productionUrl?: string;
  imageKeys?: string[];
  description: string;
  categories: ProjectCategoryKey[];
  techStacks: TechStackKey[];
}

export interface PostProjectRegisterResponse {
  id: number;
}
