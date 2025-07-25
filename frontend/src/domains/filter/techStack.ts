export const TECH_STACK_ICON_MAP = {
  react: {
    label: "React",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  nextjs: {
    label: "Next.js",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  vuejs: {
    label: "Vue.js",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  nuxtjs: {
    label: "Nuxt.js",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  angular: {
    label: "Angular",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  svelte: {
    label: "Svelte",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  jquery: {
    label: "JQuery",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  typescript: {
    label: "TypeScript",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  javascript: {
    label: "JavaScript",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  tailwind: {
    label: "TailwindCSS",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  redux: {
    label: "Redux",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  nodejs: {
    label: "Node.js",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  express: {
    label: "Express.js",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  nestjs: {
    label: "NestJS",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  django: {
    label: "Django",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  fastapi: {
    label: "FastAPI",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  spring: {
    label: "Spring",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  rubyonrails: {
    label: "Ruby on Rails",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  aws: {
    label: "AWS",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  mongodb: {
    label: "MongoDB",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  postgresql: {
    label: "PostgreSQL",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  mysql: {
    label: "MySQL",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  redis: {
    label: "Redis",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  kafka: {
    label: "Apache Kafka",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  docker: {
    label: "Docker",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  kubernetes: {
    label: "Kubernetes",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  java: {
    label: "Java",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  python: {
    label: "Python",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  c: {
    label: "C",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  cpp: {
    label: "C++",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  kotlin: {
    label: "Kotlin",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  swift: {
    label: "Swift",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
  flutter: {
    label: "Flutter",
    imgUrl: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  },
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
export const TECH_STACK_ENTRY = Object.entries(TECH_STACK_ICON_MAP);
export type TechStackEntry = (typeof TECH_STACK_ENTRY)[number];
