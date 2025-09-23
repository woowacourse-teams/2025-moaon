import {
  ALL_TOPICS_ENTRY,
  ANDROID_TOPICS_ENTRY,
  BACKEND_TOPICS_ENTRY,
  FRONTEND_TOPICS_ENTRY,
  INFRA_TOPICS_ENTRY,
  IOS_TOPICS_ENTRY,
  NON_TECH_TOPICS_ENTRY,
} from "@domains/filter/articleTopic";
import {
  RECOMMEND_ALL_STACKS,
  RECOMMEND_ANDROID_STACKS,
  RECOMMEND_BACKEND_STACKS,
  RECOMMEND_FRONTEND_STACKS,
  RECOMMEND_INFRA_STACKS,
  RECOMMEND_IOS_STACKS,
} from "@domains/filter/recommendTechStack";
import {
  ANDROID_STACK_ENTRY,
  BACKEND_STACK_ENTRY,
  FRONTEND_STACK_ENTRY,
  IOS_STACK_ENTRY,
  TECH_STACK_ENTRY,
} from "@domains/filter/techStack";

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
      return RECOMMEND_ALL_STACKS;
    default:
      return RECOMMEND_ALL_STACKS;
  }
};

export const getTopicsBySector = (sector: string | null) => {
  switch (sector) {
    case "fe":
      return FRONTEND_TOPICS_ENTRY;
    case "be":
      return BACKEND_TOPICS_ENTRY;
    case "android":
      return ANDROID_TOPICS_ENTRY;
    case "ios":
      return IOS_TOPICS_ENTRY;
    case "infra":
      return INFRA_TOPICS_ENTRY;
    case "nonTech":
      return NON_TECH_TOPICS_ENTRY;
    case "all":
    case null:
      return ALL_TOPICS_ENTRY;
    default:
      return ALL_TOPICS_ENTRY;
  }
};
