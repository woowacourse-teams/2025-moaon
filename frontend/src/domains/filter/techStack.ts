import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const TECH_STACK_ICON_MAP = {
  react: {
    label: "React",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/React.svg",
  },
  nextjs: {
    label: "Next.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Next.js.svg",
  },
  vuejs: {
    label: "Vue.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Vue.js.svg",
  },
  angular: {
    label: "Angular",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Angular.svg",
  },
  svelte: {
    label: "Svelte",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Svelte.svg",
  },
  jquery: {
    label: "JQuery",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/jQuery.svg",
  },
  typescript: {
    label: "TypeScript",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/TypeScript.svg",
  },
  javascript: {
    label: "JavaScript",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/JavaScript.svg",
  },
  tailwind: {
    label: "TailwindCSS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Tailwind+CSS.svg",
  },
  redux: {
    label: "Redux",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Redux.svg",
  },
  nodejs: {
    label: "Node.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Node.js.svg",
  },
  express: {
    label: "Express.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Express.svg",
  },
  nestjs: {
    label: "NestJS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Next.js.svg",
  },
  django: {
    label: "Django",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Django.svg",
  },
  fastapi: {
    label: "FastAPI",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/FastAPI.svg",
  },
  spring: {
    label: "Spring",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Spring.svg",
  },
  rubyonrails: {
    label: "Ruby on Rails",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Ruby+on+Rails.svg",
  },
  aws: {
    label: "AWS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/AWS.svg",
  },
  mongodb: {
    label: "MongoDB",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/MongoDB.svg",
  },
  postgresql: {
    label: "PostgreSQL",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/PostgresSQL.svg",
  },
  mysql: {
    label: "MySQL",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/MySQL.svg",
  },
  redis: {
    label: "Redis",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Redis.svg",
  },
  kafka: {
    label: "Apache Kafka",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/FastAPI.svg",
  },
  docker: {
    label: "Docker",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/FastAPI.svg",
  },
  kubernetes: {
    label: "Kubernetes",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/FastAPI.svg",
  },
  java: {
    label: "Java",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Java.svg",
  },
  python: {
    label: "Python",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Python.svg",
  },
  c: {
    label: "C",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/C.svg",
  },
  cpp: {
    label: "C++",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/C%2B%2B+(CPlusPlus).svg",
  },
  kotlin: {
    label: "Kotlin",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Kotlin.svg",
  },
  swift: {
    label: "Swift",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Swift.svg",
  },
  flutter: {
    label: "Flutter",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/Flutter.svg",
  },
  // nuxtjs: {
  //   label: "Nuxt.js",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // styledComponents: {
  //   label: "Styled-Components",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // emotion: {
  //   label: "Emotion",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // cssModule: {
  //   label: "CSS Module",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // recoil: {
  //   label: "Recoil",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // zustand: {
  //   label: "Zustand",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // jotai: {
  //   label: "Jotai",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // tanstackQuery: {
  //   label: "Tanstack-Query",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // reactNative: {
  //   label: "React Native",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // springboot: {
  //   label: "Spring Boot",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
  // supabase: {
  //   label: "Supabase",
  //   imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  // },
} as const;

export type TechStackKey = keyof typeof TECH_STACK_ICON_MAP;
export const TECH_STACK_ENTRY = typeSafeObjectEntries(TECH_STACK_ICON_MAP);
