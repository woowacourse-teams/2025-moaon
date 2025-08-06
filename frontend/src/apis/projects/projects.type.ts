import type { TechStackKey } from "@domains/filter/techStack";

export interface ProjectCard {
  id: number;
  title: string;
  summary: string;
  techStacks: TechStackKey[];
  thumbnailUrl: string;
  isLoved: boolean;
  loves: number;
  views: number;
}

export interface ProjectsResponse {
  contents: ProjectCard[];
  totalCount: number;
  hasNext: boolean;
  nextCursor: string | null;
}
