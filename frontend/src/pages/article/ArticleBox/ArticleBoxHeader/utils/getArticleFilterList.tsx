import TechStackFilterBox from "@domains/components/TechStackFilterBox/TechStackFilterBox";
import TopicFilterBox from "@domains/components/TopicFilterBox/TopicFilterBox";
import type { ArticleSectorKey } from "@domains/filter/articleSector";

export const getArticleFilterList = (sector: ArticleSectorKey) => {
  if (sector === "nonTech") {
    return [
      {
        label: "주제",
        param: "topics",
        render: (onSelect: () => void) => (
          <TopicFilterBox onSelect={onSelect} />
        ),
      },
    ];
  }

  return [
    {
      label: "기술 스택",
      param: "techStacks",
      render: (onSelect: () => void) => (
        <TechStackFilterBox onSelect={onSelect} />
      ),
    },
    {
      label: "주제",
      param: "topics",
      render: (onSelect: () => void) => <TopicFilterBox onSelect={onSelect} />,
    },
  ];
};
