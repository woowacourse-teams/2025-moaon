import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const FRONTEND_STACK_ICON_MAP = {
  react: {
    label: "React",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/React.svg",
  },
  nextjs: {
    label: "Next.js",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Next.js.svg",
  },
  vuejs: {
    label: "Vue.js",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Vue.js.svg",
  },
  angular: {
    label: "Angular",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Angular.svg",
  },
  svelte: {
    label: "Svelte",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Svelte.svg",
  },
  typescript: {
    label: "TypeScript",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/TypeScript.svg",
  },
  javascript: {
    label: "JavaScript",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/JavaScript.svg",
  },
  tailwind: {
    label: "TailwindCSS",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/TailwindCSS.svg",
  },
  redux: {
    label: "Redux",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Redux.svg",
  },
  vite: {
    label: "Vite",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Vite.svg",
  },
  tanstackQuery: {
    label: "Tanstack Query",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Tanstack-Query.svg",
  },
  jotai: {
    label: "Jotai",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jotai.svg",
  },
  zustand: {
    label: "Zustand",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Zustand.svg",
  },
  styledComponents: {
    label: "Styled Components",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Styled-Components.svg",
  },
  emotion: {
    label: "Emotion",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Emotion.svg",
  },
  recoil: {
    label: "Recoil",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Recoil.svg",
  },
  nuxtjs: {
    label: "Nuxt.js",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Nuxt.js.svg",
  },
  astro: {
    label: "Astro",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Astro.svg",
  },
  solidjs: {
    label: "SolidJS",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/SolidJS.svg",
  },
  remix: {
    label: "Remix",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Remix.svg",
  },
  biome: {
    label: "Biome",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Biome.svg",
  },
  msw: {
    label: "Msw",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Msw.svg",
  },
  jest: {
    label: "Jest",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jest.svg",
  },
  reacttestinglibrary: {
    label: "ReactTestingLibrary",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/ReactTestingLibrary.svg",
  },
  storybook: {
    label: "Storybook",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Storybook.svg",
  },
  babel: {
    label: "Babel",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Babel.svg",
  },
  cypress: {
    label: "Cypress",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Cypress.svg",
  },
  pwa: {
    label: "PWA",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/PWA.svg",
  },
  sass: {
    label: "Sass",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Sass.svg",
  },
  axios: {
    label: "Axios",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Axios.svg",
  },
  yarnberry: {
    label: "YarnBerry",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/YarnBerry.svg",
  },
  prettier: {
    label: "Prettier",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Prettier.svg",
  },
  websocket: {
    label: "Websocket",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Websocket.svg",
  },
  cloudfront: {
    label: "CloudFront",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/CloudFront.svg",
  },
  webpack: {
    label: "Webpack",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Webpack.svg",
  },
} as const;

export const BACKEND_STACK_ICON_MAP = {
  nodejs: {
    label: "Node.js",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Node.js.svg",
  },
  express: {
    label: "Express.js",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Express.svg",
  },
  nestjs: {
    label: "Nest.js",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Nest.js.svg",
  },
  django: {
    label: "Django",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Django.svg",
  },
  fastapi: {
    label: "FastAPI",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/FastAPI.svg",
  },
  spring: {
    label: "Spring",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Spring.svg",
  },
  rubyonrails: {
    label: "Ruby on Rails",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/RubyonRails.svg",
  },
  aws: {
    label: "AWS",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/AWS.svg",
  },
  mongodb: {
    label: "MongoDB",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/MongoDB.svg",
  },
  postgresql: {
    label: "PostgreSQL",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/PostgresSQL.svg",
  },
  mysql: {
    label: "MySQL",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/MySQL.svg",
  },
  redis: {
    label: "Redis",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Redis.svg",
  },
  kafka: {
    label: "Apache Kafka",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/ApacheKafka.svg",
  },
  docker: {
    label: "Docker",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Docker.svg",
  },
  kubernetes: {
    label: "Kubernetes",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Kubernetes.svg",
  },
  java: {
    label: "Java",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Java.svg",
  },
  python: {
    label: "Python",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Python.svg",
  },
  go: {
    label: "Go",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Go.svg",
  },
  rust: {
    label: "Rust",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Rust.svg",
  },
  deno: {
    label: "Deno",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Deno.svg",
  },
  supabase: {
    label: "Supabase",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Supabase.svg",
  },
  prisma: {
    label: "Prisma",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Prisma.svg",
  },
  trpc: {
    label: "tRPC",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/tRPC.svg",
  },
  elasticsearch: {
    label: "Elasticsearch",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/ElasticSearch.svg",
  },
  grafana: {
    label: "Grafana",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Grafana.svg",
  },
  jenkins: {
    label: "Jenkins",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jenkins.svg",
  },
  jpa: {
    label: "JPA",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/JPA.svg",
  },
  querydsl: {
    label: "Querydsl",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Querydsl.svg",
  },
  oauth2: {
    label: "Oauth2",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Oauth2.svg",
  },
  apachezookeeper: {
    label: "Apachezookeeper",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/ApacheZookeeper.svg",
  },
  restdocs: {
    label: "Restdocs",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Restdocs.svg",
  },
  junit5: {
    label: "Junit5",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Junit5.svg",
  },
  restassured: {
    label: "RestAssured",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/RestAssured.svg",
  },
  mockito: {
    label: "Mockito",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Mockito.svg",
  },
  slf4j: {
    label: "Slf4j",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Slf4j.svg",
  },
  swagger: {
    label: "Swagger",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Swagger.svg",
  },
  logstash: {
    label: "Logstash",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Logstash.svg",
  },
  kibana: {
    label: "Kibana",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Kibana.svg",
  },
  flyway: {
    label: "Flyway",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Flyway.svg",
  },
  h2: {
    label: "H2",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/H2.svg",
  },
  nginx: {
    label: "Nginx",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Nginx.svg",
  },
  prometheus: {
    label: "Prometheus",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Prometheus.svg",
  },
  ec2: {
    label: "Ec2",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Ec2.svg",
  },
  s3: {
    label: "S3",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/S3.svg",
  },
  cloudwatch: {
    label: "CloudWatch",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/CloudWatch.svg",
  },
  jacoco: {
    label: "Jacoco",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jacoco.svg",
  },
  sonarqube: {
    label: "SonarQube",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/SonarQube.svg",
  },
  gradle: {
    label: "Gradle",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Gradle.svg",
  },
  jwt: {
    label: "JWT",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/JWT.svg",
  },
  ical4j: {
    label: "Ical4j",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Ical4j.svg",
  },
  jmeter: {
    label: "Jmeter",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jmeter.svg",
  },
  jackson: {
    label: "Jackson",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jackson.svg",
  },
  mariadb: {
    label: "MariaDB",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/MariaDB.svg",
  },
  sonarcloud: {
    label: "SonarCloud",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/SonarCloud.svg",
  },
  gatling: {
    label: "Gatling",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Gatling.svg",
  },
  ngrinder: {
    label: "Ngrinder",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Ngrinder.svg",
  },
  rabbitmq: {
    label: "Rabbitmq",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Rabbitmq.svg",
  },
  k6: {
    label: "K6",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/K6.svg",
  },
  lombok: {
    label: "Lombok",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Lombok.svg",
  },
} as const;

export const ANDROID_STACK_ICON_MAP = {
  kotlin: {
    label: "Kotlin",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Kotlin.svg",
  },
  compose: {
    label: "Jetpack Compose",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/JetpackCompose.svg",
  },
  java: {
    label: "Java",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Java.svg",
  },
  flutter: {
    label: "Flutter",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Flutter.svg",
  },
  retrofit: {
    label: "Retrofit",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Retrofit.svg",
  },
  moshi: {
    label: "Moshi",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Moshi.svg",
  },
  coroutines: {
    label: "Coroutines",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Coroutines.svg",
  },
  flow: {
    label: "Flow",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Flow.svg",
  },
  room: {
    label: "Room",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Room.svg",
  },
  dataStore: {
    label: "DataStore",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/DataStore.svg",
  },
  hilt: {
    label: "Hilt",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Hilt.svg",
  },
  jetpack: {
    label: "Jetpack",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Jetpack.svg",
  },
  firebase: {
    label: "Firebase",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Firebase.svg",
  },
  retrofit2: {
    label: "Retrofit2",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Retrofit2.svg",
  },
  glide: {
    label: "Glide",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Glide.svg",
  },
  mockk: {
    label: "Mockk",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Mockk.svg",
  },
  turbine: {
    label: "Turbine",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Turbine.svg",
  },
  zxing: {
    label: "Zxing",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Zxing.svg",
  },
  okhttp3: {
    label: "Okhttp3",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Okhttp3.svg",
  },
} as const;

export const IOS_STACK_ICON_MAP = {
  swift: {
    label: "Swift",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Swift.svg",
  },
  swiftui: {
    label: "SwiftUI",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/SwiftUI.svg",
  },
  rxswift: {
    label: "RxSwift",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/RxSwift.svg",
  },
  alamofire: {
    label: "Alamofire",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Alamofire.svg",
  },
  flutter: {
    label: "Flutter",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/Flutter.svg",
  },
  restClient: {
    label: "Restclient",
    imgUrl: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/teckstack-icons/RestClient.svg",
  },
} as const;

export const TECH_STACK_ICON_MAP = {
  ...FRONTEND_STACK_ICON_MAP,
  ...BACKEND_STACK_ICON_MAP,
  ...ANDROID_STACK_ICON_MAP,
  ...IOS_STACK_ICON_MAP,
} as const;

export type FrontendStackKey = keyof typeof FRONTEND_STACK_ICON_MAP;
export type BackendStackKey = keyof typeof BACKEND_STACK_ICON_MAP;
export type AndroidStackKey = keyof typeof ANDROID_STACK_ICON_MAP;
export type IosStackKey = keyof typeof IOS_STACK_ICON_MAP;

export type TechStackKey = FrontendStackKey | BackendStackKey | AndroidStackKey | IosStackKey;

export const FRONTEND_STACK_ENTRY = typeSafeObjectEntries(FRONTEND_STACK_ICON_MAP).sort(([a], [b]) => a.localeCompare(b));

export const BACKEND_STACK_ENTRY = typeSafeObjectEntries(BACKEND_STACK_ICON_MAP).sort(([a], [b]) => a.localeCompare(b));

export const ANDROID_STACK_ENTRY = typeSafeObjectEntries(ANDROID_STACK_ICON_MAP).sort(([a], [b]) => a.localeCompare(b));

export const IOS_STACK_ENTRY = typeSafeObjectEntries(IOS_STACK_ICON_MAP).sort(([a], [b]) => a.localeCompare(b));

export const TECH_STACK_ENTRY = typeSafeObjectEntries(TECH_STACK_ICON_MAP).sort(([a], [b]) => a.localeCompare(b));
