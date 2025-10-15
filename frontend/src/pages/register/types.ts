import type { ArticleSectorKey } from "@domains/filter/articleSector";
import type { AllTopicKey } from "@domains/filter/articleTopic";
import type { ProjectCategoryKey } from "@domains/filter/projectCategory";
import type { TechStackKey } from "@domains/filter/techStack";

export interface ProjectFormDataType {
  title: string;
  description: string;
  githubUrl: string;
  serviceUrl: string;
  overview: string;
  topics: ProjectCategoryKey[];
  techStacks: TechStackKey[];
}

export interface ArticleFormDataType {
  id: string;
  address: string;
  title: string;
  description: string;
  sector: ArticleSectorKey;
  topics: AllTopicKey[];
  techStacks: TechStackKey[];
}
