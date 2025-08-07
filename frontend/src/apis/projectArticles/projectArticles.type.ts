import type { ArticleCategoryKey } from "@domains/filter/articleCategory";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ProjectArticle {
  id: number;
  title: string;
  summary: string;
  techStacks: TechStackKey[];
  url: string;
  category: ArticleCategoryKey;
  createdAt: string;
}
