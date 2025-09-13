import type { ArticleSectorKey } from "@domains/filter/articleSector";
import type { AllTopicKey } from "@domains/filter/articleTopic";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ProjectArticle {
  id: number;
  title: string;
  clicks: number;
  summary: string;
  techStacks: TechStackKey[];
  url: string;
  sector: ArticleSectorKey;
  topics: AllTopicKey[];
  createdAt: string;
}

export interface ProjectArticleCount {
  sector: ArticleSectorKey;
  count: number;
}

export interface ProjectArticlesResponse {
  count: ProjectArticleCount[];
  data: ProjectArticle[];
}
