import type { CategoryKey } from "@domains/filter/category";
import type { PlatformKey } from "@domains/filter/platform";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ProjectDetail {
  id: number;
  authorId: number;
  title: string;
  summary: string;
  description: string;
  organization: string;
  techStacks: TechStackKey[];
  platforms: PlatformKey[];
  categories: CategoryKey[];
  imageUrls: string[];
  isLoved: boolean;
  loves: number;
  views: number;
  createdAt: string;
  githubUrl: string;
  productionUrl: string;
}
