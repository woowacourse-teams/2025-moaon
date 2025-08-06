import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const TECH_STACK_ICON_MAP = {
  react: {
    label: "React",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/React.svg",
  },
  nextjs: {
    label: "Next.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Next.js.svg",
  },
  vuejs: {
    label: "Vue.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Vue.js.svg",
  },
  angular: {
    label: "Angular",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Angular.svg",
  },
  svelte: {
    label: "Svelte",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Svelte.svg",
  },
  jquery: {
    label: "JQuery",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/jQuery.svg",
  },
  typescript: {
    label: "TypeScript",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/TypeScript.svg",
  },
  javascript: {
    label: "JavaScript",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/JavaScript.svg",
  },
  tailwind: {
    label: "TailwindCSS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/TailwindCSS.svg",
  },
  redux: {
    label: "Redux",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Redux.svg",
  },
  nodejs: {
    label: "Node.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Node.js.svg",
  },
  express: {
    label: "Express.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Express.svg",
  },
  nestjs: {
    label: "NestJS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Next.js.svg",
  },
  django: {
    label: "Django",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Django.svg",
  },
  fastapi: {
    label: "FastAPI",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/FastAPI.svg",
  },
  spring: {
    label: "Spring",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Spring.svg",
  },
  rubyonrails: {
    label: "Ruby on Rails",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/RubyonRails.svg",
  },
  aws: {
    label: "AWS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/AWS.svg",
  },
  mongodb: {
    label: "MongoDB",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/MongoDB.svg",
  },
  postgresql: {
    label: "PostgreSQL",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/PostgresSQL.svg",
  },
  mysql: {
    label: "MySQL",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/MySQL.svg",
  },
  redis: {
    label: "Redis",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Redis.svg",
  },
  kafka: {
    label: "Apache Kafka",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/ApacheKafka.svg",
  },
  docker: {
    label: "Docker",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Docker.svg",
  },
  kubernetes: {
    label: "Kubernetes",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Kubernetes.svg",
  },
  java: {
    label: "Java",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Java.svg",
  },
  python: {
    label: "Python",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Python.svg",
  },
  c: {
    label: "C",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/C.svg",
  },
  cpp: {
    label: "C++",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/C%2B%2B.svg",
  },
  kotlin: {
    label: "Kotlin",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Kotlin.svg",
  },
  swift: {
    label: "Swift",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Swift.svg",
  },
  flutter: {
    label: "Flutter",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Flutter.svg",
  },
  tanstackQuery: {
    label: "Tanstack-Query",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Tanstack-Query.svg",
  },
  jotai: {
    label: "Jotai",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jotai.svg",
  },
  reactNative: {
    label: "React Native",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/ReactNative.svg",
  },
  zustand: {
    label: "Zustand",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Zustand.svg",
  },
  styledComponents: {
    label: "Styled-Components",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Styled-Components.svg",
  },
  emotion: {
    label: "Emotion",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Emotion.svg",
  },
  recoil: {
    label: "Recoil",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Recoil.svg",
  },
  nuxtjs: {
    label: "Nuxt.js",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Nuxt.js.svg",
  },
  vite: {
    label: "Vite",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Vite.svg",
  },
  astro: {
    label: "Astro",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Astro.svg",
  },
  solidjs: {
    label: "SolidJS",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/SolidJS.svg",
  },
  remix: {
    label: "Remix",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Remix.svg",
  },
  springboot: {
    label: "Spring Boot",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/SpringBoot.svg",
  },
  supabase: {
    label: "Supabase",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Supabase.svg",
  },
  prisma: {
    label: "Prisma",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Prisma.svg",
  },
  trpc: {
    label: "tRPC",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/tRPC.svg",
  },
  go: {
    label: "Go",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Go.svg",
  },
  rust: {
    label: "Rust",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Rust.svg",
  },
  deno: {
    label: "Deno",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Deno.svg",
  },
  compose: {
    label: "Jetpack Compose",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/JetpackCompose.svg",
  },
  rxswift: {
    label: "RxSwift",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/RxSwift.svg",
  },
  alamofire: {
    label: "Alamofire",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Alamofire.svg",
  },
  swiftui: {
    label: "SwiftUI",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/SwiftUI.svg",
  },
  githubAction: {
    label: "Github Action",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/GithubAction.svg",
  },
  git: {
    label: "Git",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Git.svg",
  },
  elasticsearch: {
    label: "ElasticSearch",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/ElasticSearch.svg",
  },
  grafana: {
    label: "Grafana",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Grafana.svg",
  },
  jenkins: {
    label: "Jenkins",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jenkins.svg",
  },
  jpa: {
    label: "JPA",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/JPA.svg",
  },
  querydsl: {
    label: "Querydsl",
    imgUrl:
      "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Querydsl.svg",
  },
} as const;

export type TechStackKey = keyof typeof TECH_STACK_ICON_MAP;
export const TECH_STACK_ENTRY = typeSafeObjectEntries(TECH_STACK_ICON_MAP);
