import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ArticleListResponse {
  contents: Article[];
  totalCount: number;
  hasNext: boolean;
  nextCursor: string;
}

export interface Article {
  id: number;
  projectId: number;
  clicks: number;
  title: string;
  summary: string;
  techStacks: TechStackKey[];
  url: string;
  category: ProjectCategoryKey;
  createdAt: string;
}
