import { TECH_STACK_ICON_MAP, type TechStackKey } from "./techStack";

export const ICON_BADGE_MAP = {
  ...TECH_STACK_ICON_MAP,
} as const;

export type IconBadgeKeys = TechStackKey[];
