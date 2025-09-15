import {
  BACKEND_TOPIC_ENTRY,
  COMMON_TOPIC_ENTRY,
  FRONTEND_TOPIC_ENTRY,
  INFRA_TOPIC_ENTRY,
  NON_TECH_TOPIC_ENTRY,
  TOPIC_ENTRY,
} from "@domains/filter/topic";

export function getTopicsBySector(sector: string | null) {
  switch (sector) {
    case "fe":
      return [...FRONTEND_TOPIC_ENTRY, ...COMMON_TOPIC_ENTRY];
    case "be":
      return [...BACKEND_TOPIC_ENTRY, ...COMMON_TOPIC_ENTRY];
    case "infra":
      return [...INFRA_TOPIC_ENTRY, ...COMMON_TOPIC_ENTRY];
    case "nonTech":
      return [...NON_TECH_TOPIC_ENTRY, ...COMMON_TOPIC_ENTRY];
    case "Android":
    case "ios":
      return COMMON_TOPIC_ENTRY;
    case "all":
    case null:
    case undefined:
      return TOPIC_ENTRY;
    default:
      return TOPIC_ENTRY;
  }
}
