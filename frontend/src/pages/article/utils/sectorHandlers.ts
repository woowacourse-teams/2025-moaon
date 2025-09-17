import {
  RECOMMEND_ANDROID_STACKS,
  RECOMMEND_BACKEND_STACKS,
  RECOMMEND_FRONTEND_STACKS,
  RECOMMEND_INFRA_STACKS,
  RECOMMEND_IOS_STACKS,
  RECOMMEND_TECH_STACKS,
} from "@domains/filter/recommendTechStack";
import {
  ANDROID_STACK_ENTRY,
  BACKEND_STACK_ENTRY,
  FRONTEND_STACK_ENTRY,
  IOS_STACK_ENTRY,
  TECH_STACK_ENTRY,
} from "@domains/filter/techStack";
import {
  BACKEND_TOPIC_ENTRY,
  COMMON_TOPIC_ENTRY,
  FRONTEND_TOPIC_ENTRY,
  INFRA_TOPIC_ENTRY,
  NON_TECH_TOPIC_ENTRY,
  TOPIC_ENTRY,
} from "@domains/filter/topic";

export const getTechStackBySector = (sector: string | null) => {
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
};

export const getRecommendTechStackBySector = (sector: string | null) => {
  switch (sector) {
    case "fe":
      return RECOMMEND_FRONTEND_STACKS;
    case "be":
      return RECOMMEND_BACKEND_STACKS;
    case "android":
      return RECOMMEND_ANDROID_STACKS;
    case "ios":
      return RECOMMEND_IOS_STACKS;
    case "infra":
      return RECOMMEND_INFRA_STACKS;
    case "all":
    case null:
      return RECOMMEND_TECH_STACKS;
    default:
      return RECOMMEND_TECH_STACKS;
  }
};

export const getTopicsBySector = (sector: string | null) => {
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
      return TOPIC_ENTRY;
    default:
      return TOPIC_ENTRY;
  }
};
