import type { PlatformKey, TechStackKey } from "@domains/filter/filter.type";

export interface ProjectCard {
  id: number;
  title: string;
  summary: string;
  organization: string;
  techStacks: TechStackKey[];
  platforms: PlatformKey[];
  thumbnailUrl: string;
  isLoved: boolean;
  loves: number;
  views: number;
}
