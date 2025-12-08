import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";

export const FRONTEND_STACK_ICON_MAP = {
  react: {
    label: "React",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/React.svg`,
  },
  nextjs: {
    label: "Next.js",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Next.js.svg`,
  },
  vuejs: {
    label: "Vue.js",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Vue.js.svg`,
  },
  angular: {
    label: "Angular",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Angular.svg`,
  },
  svelte: {
    label: "Svelte",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Svelte.svg`,
  },
  typescript: {
    label: "TypeScript",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/TypeScript.svg`,
  },
  javascript: {
    label: "JavaScript",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/JavaScript.svg`,
  },
  tailwind: {
    label: "TailwindCSS",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/TailwindCSS.svg`,
  },
  redux: {
    label: "Redux",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Redux.svg`,
  },
  vite: {
    label: "Vite",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Vite.svg`,
  },
  tanstackQuery: {
    label: "Tanstack Query",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Tanstack-Query.svg`,
  },
  jotai: {
    label: "Jotai",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jotai.svg`,
  },
  zustand: {
    label: "Zustand",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Zustand.svg`,
  },
  styledComponents: {
    label: "Styled Components",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Styled-Components.svg`,
  },
  emotion: {
    label: "Emotion",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Emotion.svg`,
  },
  recoil: {
    label: "Recoil",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Recoil.svg`,
  },
  nuxtjs: {
    label: "Nuxt.js",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Nuxt.js.svg`,
  },
  astro: {
    label: "Astro",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Astro.svg`,
  },
  solidjs: {
    label: "SolidJS",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SolidJS.svg`,
  },
  remix: {
    label: "Remix",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Remix.svg`,
  },
  biome: {
    label: "Biome",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Biome.svg`,
  },
  msw: {
    label: "MSW",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/MSW.svg`,
  },
  jest: {
    label: "Jest",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jest.svg`,
  },
  reacttestinglibrary: {
    label: "RTL",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/ReactTestingLibrary.svg`,
  },
  storybook: {
    label: "Storybook",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Storybook.svg`,
  },
  babel: {
    label: "Babel",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Babel.svg`,
  },
  cypress: {
    label: "Cypress",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Cypress.svg`,
  },
  pwa: {
    label: "PWA",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/PWA.svg`,
  },
  sass: {
    label: "Sass",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Sass.svg`,
  },
  axios: {
    label: "Axios",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Axios.svg`,
  },
  yarnberry: {
    label: "YarnBerry",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/YarnBerry.svg`,
  },
  prettier: {
    label: "Prettier",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Prettier.svg`,
  },
  websocket: {
    label: "Websocket",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Websocket.svg`,
  },
  cloudfront: {
    label: "CloudFront",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/CloudFront.svg`,
  },
  webpack: {
    label: "Webpack",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Webpack.svg`,
  },
  githubAction: {
    label: "Github Action",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/GithubAction.svg`,
  },
  git: {
    label: "Git",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Git.svg`,
  },
  css: {
    label: "CSS",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/CSS.svg`,
  },
  lighthouse: {
    label: "light house",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/LightHouse.svg`,
  },
  reactRouter: {
    label: "react-router",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/ReactRouter.svg`,
  },
  sentry: {
    label: "Sentry",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Sentry.svg`,
  },
  googleAnalytics: {
    label: "Google Analytics",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/GoogleAnalytics.svg`,
  },
} as const;

export const BACKEND_STACK_ICON_MAP = {
  nodejs: {
    label: "Node.js",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Node.js.svg`,
  },
  express: {
    label: "Express.js",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Express.svg`,
  },
  nestjs: {
    label: "Nest.js",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Nest.js.svg`,
  },
  django: {
    label: "Django",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Django.svg`,
  },
  fastapi: {
    label: "FastAPI",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/FastAPI.svg`,
  },
  spring: {
    label: "Spring",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Spring.svg`,
  },
  springboot: {
    label: "SpringBoot",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SpringBoot.svg`,
  },
  rubyonrails: {
    label: "Ruby on Rails",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/RubyonRails.svg`,
  },
  aws: {
    label: "AWS",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/AWS.svg`,
  },
  mongodb: {
    label: "MongoDB",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/MongoDB.svg`,
  },
  postgresql: {
    label: "PostgreSQL",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/PostgresSQL.svg`,
  },
  mysql: {
    label: "MySQL",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/MySQL.svg`,
  },
  redis: {
    label: "Redis",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Redis.svg`,
  },
  kafka: {
    label: "Apache Kafka",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/ApacheKafka.svg`,
  },
  docker: {
    label: "Docker",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Docker.svg`,
  },
  kubernetes: {
    label: "Kubernetes",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Kubernetes.svg`,
  },
  java: {
    label: "Java",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Java.svg`,
  },
  python: {
    label: "Python",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Python.svg`,
  },
  go: {
    label: "Go",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Go.svg`,
  },
  rust: {
    label: "Rust",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Rust.svg`,
  },
  deno: {
    label: "Deno",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Deno.svg`,
  },
  supabase: {
    label: "Supabase",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Supabase.svg`,
  },
  prisma: {
    label: "Prisma",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Prisma.svg`,
  },
  trpc: {
    label: "tRPC",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/tRPC.svg`,
  },
  grafana: {
    label: "Grafana",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Grafana.svg`,
  },
  jenkins: {
    label: "Jenkins",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jenkins.svg`,
  },
  jpa: {
    label: "JPA",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/JPA.svg`,
  },
  querydsl: {
    label: "Querydsl",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Querydsl.svg`,
  },
  oauth2: {
    label: "OAuth2",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/OAuth2.svg`,
  },
  apachezookeeper: {
    label: "Apache Zookeeper",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/ApacheZookeeper.svg`,
  },
  restdocs: {
    label: "Restdocs",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Restdocs.svg`,
  },
  junit5: {
    label: "Junit5",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Junit5.svg`,
  },
  restassured: {
    label: "RestAssured",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/RestAssured.svg`,
  },
  mockito: {
    label: "Mockito",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Mockito.svg`,
  },
  slf4j: {
    label: "Slf4j",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Slf4j.svg`,
  },
  swagger: {
    label: "Swagger",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Swagger.svg`,
  },
  logstash: {
    label: "Logstash",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Logstash.svg`,
  },
  kibana: {
    label: "Kibana",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Kibana.svg`,
  },
  flyway: {
    label: "Flyway",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Flyway.svg`,
  },
  h2: {
    label: "H2",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/H2.svg`,
  },
  nginx: {
    label: "Nginx",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Nginx.svg`,
  },
  prometheus: {
    label: "Prometheus",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Prometheus.svg`,
  },
  ec2: {
    label: "EC2",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/EC2.svg`,
  },
  s3: {
    label: "S3",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/S3.svg`,
  },
  cloudwatch: {
    label: "CloudWatch",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/CloudWatch.svg`,
  },
  jacoco: {
    label: "Jacoco",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jacoco.svg`,
  },
  sonarqube: {
    label: "SonarQube",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SonarQube.svg`,
  },
  gradle: {
    label: "Gradle",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Gradle.svg`,
  },
  jwt: {
    label: "JWT",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/JWT.svg`,
  },
  ical4j: {
    label: "Ical4j",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Ical4j.svg`,
  },
  jmeter: {
    label: "Jmeter",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jmeter.svg`,
  },
  jackson: {
    label: "Jackson",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jackson.svg`,
  },
  mariadb: {
    label: "MariaDB",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/MariaDB.svg`,
  },
  sonarcloud: {
    label: "SonarCloud",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SonarCloud.svg`,
  },
  gatling: {
    label: "Gatling",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Gatling.svg`,
  },
  ngrinder: {
    label: "Ngrinder",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Ngrinder.svg`,
  },
  rabbitmq: {
    label: "Rabbitmq",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Rabbitmq.svg`,
  },
  k6: {
    label: "K6",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/K6.svg`,
  },
  lombok: {
    label: "Lombok",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Lombok.svg`,
  },
  githubAction: {
    label: "Github Action",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/GithubAction.svg`,
  },
  git: {
    label: "Git",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Git.svg`,
  },
  elasticSearch: {
    label: "ElasticSearch",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/ElasticSearch.svg`,
  },
  springWebFlux: {
    label: "Spring WebFlux",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SpringWebFlux.svg`,
  },
  log4j2: {
    label: "log4j2",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Log4j2.svg`,
  },
  locust: {
    label: "Locust",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Locust.svg`,
  },
  springSecurity: {
    label: "Spring Security",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SpringSecurity.svg`,
  },
} as const;

export const ANDROID_STACK_ICON_MAP = {
  kotlin: {
    label: "Kotlin",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Kotlin.svg`,
  },
  compose: {
    label: "Jetpack Compose",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/JetpackCompose.svg`,
  },
  java: {
    label: "Java",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Java.svg`,
  },
  flutter: {
    label: "Flutter",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Flutter.svg`,
  },
  retrofit: {
    label: "Retrofit",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Retrofit.svg`,
  },
  moshi: {
    label: "Moshi",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Moshi.svg`,
  },
  coroutines: {
    label: "Coroutines",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Coroutines.svg`,
  },
  flow: {
    label: "Flow",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Flow.svg`,
  },
  room: {
    label: "Room",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Room.svg`,
  },
  dataStore: {
    label: "DataStore",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/DataStore.svg`,
  },
  hilt: {
    label: "Hilt",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Hilt.svg`,
  },
  jetpack: {
    label: "Jetpack",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jetpack.svg`,
  },
  firebase: {
    label: "Firebase",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Firebase.svg`,
  },
  retrofit2: {
    label: "Retrofit2",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Retrofit2.svg`,
  },
  glide: {
    label: "Glide",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Glide.svg`,
  },
  mockk: {
    label: "MockK",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Mockk.svg`,
  },
  turbine: {
    label: "Turbine",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Turbine.svg`,
  },
  zxing: {
    label: "Zxing",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Zxing.svg`,
  },
  okhttp3: {
    label: "Okhttp3",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Okhttp3.svg`,
  },
  githubAction: {
    label: "Github Action",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/GithubAction.svg`,
  },
  git: {
    label: "Git",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Git.svg`,
  },
  fusedLocationProviderClient: {
    label: "FusedLocationProviderClient",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jetpack.svg`,
  },
  locationManager: {
    label: "locationManager",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jetpack.svg`,
  },
  serialization: {
    label: "Serialization",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Kotlin.svg`,
  },
  reactNative: {
    label: "React Native",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/ReactNative.svg`,
  },
  recyclerView: {
    label: "RecyclerView",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jetpack.svg`,
  },
  coil: {
    label: "Coil",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Coil.svg`,
  },
  timber: {
    label: "Timber",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Timber.svg`,
  },
  lottie: {
    label: "Lottie",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Lottie.svg`,
  },
} as const;

export const IOS_STACK_ICON_MAP = {
  swift: {
    label: "Swift",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Swift.svg`,
  },
  swiftui: {
    label: "SwiftUI",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SwiftUI.svg`,
  },
  rxswift: {
    label: "RxSwift",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/RxSwift.svg`,
  },
  alamofire: {
    label: "Alamofire",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Alamofire.svg`,
  },
  flutter: {
    label: "Flutter",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Flutter.svg`,
  },
  restClient: {
    label: "Restclient",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/RestClient.svg`,
  },
  githubAction: {
    label: "Github Action",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/GithubAction.svg`,
  },
  git: {
    label: "Git",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Git.svg`,
  },
  reactNative: {
    label: "React Native",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/ReactNative.svg`,
  },
} as const;

export const INFRA_STACK_ICON_MAP = {
  aws: {
    label: "AWS",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/AWS.svg`,
  },
  ec2: {
    label: "EC2",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/EC2.svg`,
  },
  s3: {
    label: "S3",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/S3.svg`,
  },
  cloudfront: {
    label: "CloudFront",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/CloudFront.svg`,
  },
  cloudwatch: {
    label: "CloudWatch",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/CloudWatch.svg`,
  },
  docker: {
    label: "Docker",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Docker.svg`,
  },
  kubernetes: {
    label: "Kubernetes",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Kubernetes.svg`,
  },
  nginx: {
    label: "Nginx",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Nginx.svg`,
  },
  jenkins: {
    label: "Jenkins",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Jenkins.svg`,
  },
  grafana: {
    label: "Grafana",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Grafana.svg`,
  },
  prometheus: {
    label: "Prometheus",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Prometheus.svg`,
  },
  sonarqube: {
    label: "SonarQube",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SonarQube.svg`,
  },
  sonarcloud: {
    label: "SonarCloud",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/SonarCloud.svg`,
  },
  logstash: {
    label: "Logstash",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Logstash.svg`,
  },
  kibana: {
    label: "Kibana",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Kibana.svg`,
  },
  flyway: {
    label: "Flyway",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/Flyway.svg`,
  },
  githubAction: {
    label: "Github Action",
    imgUrl: `${process.env.S3_BASE_URL}/teckstack-icons/GithubAction.svg`,
  },
} as const;

export const TECH_STACK_ICON_MAP = {
  ...FRONTEND_STACK_ICON_MAP,
  ...BACKEND_STACK_ICON_MAP,
  ...ANDROID_STACK_ICON_MAP,
  ...IOS_STACK_ICON_MAP,
  ...INFRA_STACK_ICON_MAP,
} as const;

export type FrontendStackKey = keyof typeof FRONTEND_STACK_ICON_MAP;
export type BackendStackKey = keyof typeof BACKEND_STACK_ICON_MAP;
export type AndroidStackKey = keyof typeof ANDROID_STACK_ICON_MAP;
export type IosStackKey = keyof typeof IOS_STACK_ICON_MAP;
export type InfraStackKey = keyof typeof INFRA_STACK_ICON_MAP;

export type TechStackKey =
  | FrontendStackKey
  | BackendStackKey
  | AndroidStackKey
  | IosStackKey
  | InfraStackKey;

export const FRONTEND_STACK_ENTRY = typeSafeObjectEntries(
  FRONTEND_STACK_ICON_MAP
).sort(([a], [b]) => a.localeCompare(b));

export const BACKEND_STACK_ENTRY = typeSafeObjectEntries(
  BACKEND_STACK_ICON_MAP
).sort(([a], [b]) => a.localeCompare(b));

export const ANDROID_STACK_ENTRY = typeSafeObjectEntries(
  ANDROID_STACK_ICON_MAP
).sort(([a], [b]) => a.localeCompare(b));

export const IOS_STACK_ENTRY = typeSafeObjectEntries(IOS_STACK_ICON_MAP).sort(
  ([a], [b]) => a.localeCompare(b)
);

export const TECH_STACK_ENTRY = typeSafeObjectEntries(TECH_STACK_ICON_MAP).sort(
  ([a], [b]) => a.localeCompare(b)
);

export const INFRA_STACK_ENTRY = typeSafeObjectEntries(
  INFRA_STACK_ICON_MAP
).sort(([a], [b]) => a.localeCompare(b));

export type AllTechStackEntry = typeof TECH_STACK_ENTRY;
