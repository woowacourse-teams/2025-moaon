import type { ArticleSectorKey } from "@domains/filter/articleSector";
import type { AllTopicKey } from "@domains/filter/articleTopic";
import type { TechStackKey } from "@domains/filter/techStack";

export interface SectorType {
  value: ArticleSectorKey;
  topics: AllTopicKey[];
  techStacks: TechStackKey[];
}

export interface ArticleFormDataType {
  id: string;
  address: string;
  title: string;
  description: string;
  sector: SectorType;
}
