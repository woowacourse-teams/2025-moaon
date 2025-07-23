import type { PLATFORM_ICON_MAP, TECH_STACK_ICON_MAP } from "./filter.constants";

export type PlatformKey = keyof typeof PLATFORM_ICON_MAP;
export type TechStackKey = keyof typeof TECH_STACK_ICON_MAP;
export type IconBadgeKeys = (PlatformKey | TechStackKey)[];
