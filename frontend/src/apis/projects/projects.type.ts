import type { OrganizationKey } from "@domains/filter/organization";
import type { PlatformKey } from "@domains/filter/platform";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ProjectCard {
  id: number;
  title: string;
  summary: string;
  organization: OrganizationKey;
  techStacks: TechStackKey[];
  platforms: PlatformKey[];
  thumbnailUrl: string;
  isLoved: boolean;
  loves: number;
  views: number;
}
