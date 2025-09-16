import {
  ANDROID_STACK_ENTRY,
  BACKEND_STACK_ENTRY,
  FRONTEND_STACK_ENTRY,
  IOS_STACK_ENTRY,
  TECH_STACK_ENTRY,
} from "@domains/filter/techStack";

export function getTechStackBySector(sector: string | null) {
  switch (sector) {
    case "fe":
      return FRONTEND_STACK_ENTRY;
    case "be":
      return BACKEND_STACK_ENTRY;
    case "Android":
      return ANDROID_STACK_ENTRY;
    case "ios":
      return IOS_STACK_ENTRY;
    case "all":
    case null:
      return TECH_STACK_ENTRY;
    default:
      return TECH_STACK_ENTRY;
  }
}
