import type { ArticleSectorKey } from "@domains/filter/articleSector";
import type { AllTopicKey } from "@domains/filter/articleTopic";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ArticleListResponse {
  contents: Article[];
  totalCount: number;
  hasNext: boolean;
  nextCursor: string | null;
}

export interface Article {
  id: number;
  projectId: number;
  projectTitle: string;
  clicks: number;
  title: string;
  summary: string;
  techStacks: TechStackKey[];
  url: string;
  topics: AllTopicKey[];
  sector: ArticleSectorKey;
  createdAt: string;
}
