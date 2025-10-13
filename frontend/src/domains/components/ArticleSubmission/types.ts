import type { ArticleSectorKey } from "@domains/filter/articleSector";
import type { AllTopicKey } from "@domains/filter/articleTopic";
import type { TechStackKey } from "@domains/filter/techStack";

export interface FormDataType {
  id: string;
  address: string;
  title: string;
  description: string;
  sector: ArticleSectorKey;
  topics: AllTopicKey[];
  techStacks: TechStackKey[];
}
